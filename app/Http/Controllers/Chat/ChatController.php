<?php

namespace App\Http\Controllers\Chat;

use App\Http\Controllers\Controller;
use App\Models\ChatGroupMember;
use App\Models\ChatMessage;
use App\Models\ChatMessageLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function getGroups(Request $request)
    {
        $user = Auth::user();
        $memberGroups = ChatGroupMember::where('user_id', $user->id)
            ->with('chatGroup')
            ->get()
            ->pluck('chatGroup');

        $groups = $memberGroups->map(function ($group) {
            $latestMessage = ChatMessage::where('chat_group_id', $group->id)
                ->with('user')
                ->latest()
                ->first();

            return [
                'id' => $group->id,
                'name' => $group->name,
                'type' => $group->type,
                'description' => $group->description,
                'latest_message' => $latestMessage ? [
                    'message' => $latestMessage->message,
                    'user_name' => $latestMessage->user->name,
                    'created_at' => $latestMessage->created_at,
                ] : null,
            ];
        });

        return response()->json($groups);
    }

    public function index(Request $request)
    {
        $user = Auth::user();
        $memberGroups = ChatGroupMember::where('user_id', $user->id)
            ->with('chatGroup')
            ->get()
            ->pluck('chatGroup');

        $groups = $memberGroups->map(function ($group) {
            $latestMessage = ChatMessage::where('chat_group_id', $group->id)
                ->with('user')
                ->latest()
                ->first();

            return [
                'id' => $group->id,
                'name' => $group->name,
                'type' => $group->type,
                'description' => $group->description,
                'latest_message' => $latestMessage ? [
                    'message' => $latestMessage->message,
                    'user_name' => $latestMessage->user->name,
                    'created_at' => $latestMessage->created_at,
                ] : null,
            ];
        });

        return inertia('chat/index', [
            'groups' => $groups,
        ]);
    }

    public function getMessages(Request $request, $groupId)
    {
        $user = Auth::user();
        $isMember = ChatGroupMember::where('chat_group_id', $groupId)
            ->where('user_id', $user->id)
            ->exists();

        if (! $isMember) {
            abort(403, 'You are not a member of this group');
        }

        $messages = ChatMessage::where('chat_group_id', $groupId)
            ->with('user')
            ->withCount('likes')
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($msg) use ($user) {
                $likedByUser = $msg->likes()->where('user_id', $user->id)->exists();
                $likedByUsers = $msg->likes()->with('user')->get()->map(fn($like) => $like->user->name);
                
                return [
                    'id' => $msg->id,
                    'message' => $msg->message,
                    'user_id' => $msg->user_id,
                    'user_name' => $msg->user->name,
                    'attachment_path' => $msg->attachment_path,
                    'created_at' => $msg->created_at,
                    'likes_count' => $msg->likes_count,
                    'liked_by_user' => $likedByUser,
                    'liked_by_names' => $likedByUsers,
                ];
            });

        return response()->json($messages);
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'group_id' => 'required|exists:chat_groups,id',
            'message' => 'required|string|max:5000',
        ]);

        $user = Auth::user();
        $isMember = ChatGroupMember::where('chat_group_id', $request->group_id)
            ->where('user_id', $user->id)
            ->exists();

        if (! $isMember) {
            abort(403, 'You are not a member of this group');
        }

        $message = ChatMessage::create([
            'chat_group_id' => $request->group_id,
            'user_id' => $user->id,
            'message' => $request->message,
        ]);

        return response()->json([
            'id' => $message->id,
            'message' => $message->message,
            'user_id' => $message->user_id,
            'user_name' => $user->name,
            'created_at' => $message->created_at,
        ]);
    }

    public function toggleLike(Request $request)
    {
        $request->validate([
            'message_id' => 'required|exists:chat_messages,id',
        ]);

        $user = Auth::user();
        $message = ChatMessage::findOrFail($request->message_id);

        $isMember = ChatGroupMember::where('chat_group_id', $message->chat_group_id)
            ->where('user_id', $user->id)
            ->exists();

        if (! $isMember) {
            abort(403, 'You are not a member of this group');
        }

        $existingLike = ChatMessageLike::where('chat_message_id', $message->id)
            ->where('user_id', $user->id)
            ->first();

        if ($existingLike) {
            $existingLike->delete();
            $liked = false;
        } else {
            ChatMessageLike::create([
                'chat_message_id' => $message->id,
                'user_id' => $user->id,
            ]);
            $liked = true;
        }

        $likesCount = $message->likes()->count();
        $likedByUsers = $message->likes()->with('user')->get()->map(fn($like) => $like->user->name);

        return response()->json([
            'liked' => $liked,
            'likes_count' => $likesCount,
            'liked_by_names' => $likedByUsers,
        ]);
    }
}
