<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ChatGroup;
use App\Models\SchoolClass;
use App\Models\User;
use Illuminate\Http\Request;

class ChatGroupController extends Controller
{
    public function index()
    {
        $groups = ChatGroup::with('class')->orderBy('created_at', 'desc')->get()->map(function ($group) {
            return [
                'id' => $group->id,
                'name' => $group->name,
                'type' => $group->type,
                'permission' => $group->permission,
                'class' => $group->class ? ['id' => $group->class->id, 'name' => $group->class->name] : null,
                'member_count' => $group->members()->count(),
            ];
        });

        $classes = SchoolClass::all()->map(fn($c) => ['id' => $c->id, 'name' => $c->name]);

        return inertia('admin/chat-groups/index', [
            'groups' => ['data' => $groups, 'total' => $groups->count()],
            'classes' => $classes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:class,personal,staff',
            'permission' => 'required|in:broadcast,interactive,readonly',
            'class_id' => 'nullable|exists:school_classes,id',
            'description' => 'nullable|string',
        ]);

        $group = ChatGroup::create($validated);

        return redirect()->route('admin.chat-groups.index')
            ->with('success', 'Chat group created successfully');
    }

    public function update(Request $request, ChatGroup $chatGroup)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:class,personal,staff',
            'permission' => 'required|in:broadcast,interactive,readonly',
            'class_id' => 'nullable|exists:school_classes,id',
            'description' => 'nullable|string',
        ]);

        $chatGroup->update($validated);

        return redirect()->route('admin.chat-groups.index')
            ->with('success', 'Chat group updated successfully');
    }

    public function destroy(ChatGroup $chatGroup)
    {
        $chatGroup->members()->delete();
        $chatGroup->messages()->delete();
        $chatGroup->delete();

        return redirect()->route('admin.chat-groups.index')
            ->with('success', 'Chat group deleted successfully');
    }

    public function addMembers(Request $request, ChatGroup $chatGroup)
    {
        $validated = $request->validate([
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        foreach ($validated['user_ids'] as $userId) {
            $chatGroup->members()->firstOrCreate(['user_id' => $userId]);
        }

        return back()->with('success', 'Members added successfully');
    }
}