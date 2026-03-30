<?php

namespace App\Http\Controllers\Chat;

use App\Http\Controllers\Controller;
use App\Models\ChatGroupMember;
use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
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
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($msg) {
                return [
                    'id' => $msg->id,
                    'message' => $msg->message,
                    'user_id' => $msg->user_id,
                    'user_name' => $msg->user->name,
                    'attachment_path' => $msg->attachment_path,
                    'created_at' => $msg->created_at,
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
}
