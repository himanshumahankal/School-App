<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class TeacherController extends Controller
{
    public function index(Request $request)
    {
        $query = Teacher::with(['user', 'subjects', 'classes']);

        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', '%'.$request->search.'%');
        }

        $allTeachers = $query->orderBy('created_at', 'desc')->get()->map(function ($teacher) {
            return [
                'id' => $teacher->id,
                'name' => $teacher->name,
                'employee_id' => $teacher->employee_id,
                'qualification' => $teacher->qualification,
                'phone' => $teacher->phone,
                'joining_date' => $teacher->joining_date,
                'user' => [
                    'email' => $teacher->user->email ?? null,
                ],
                'subjects' => $teacher->subjects->map(function ($s) {
                    return ['id' => $s->id, 'name' => $s->name];
                }),
                'classes' => $teacher->classes->map(function ($c) {
                    return ['id' => $c->id, 'name' => $c->name, 'section' => $c->section];
                }),
            ];
        });

        return inertia('admin/teachers/index', [
            'teachers' => [
                'data' => $allTeachers,
                'total' => $allTeachers->count(),
            ],
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return inertia('admin/teachers/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'qualification' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'joining_date' => 'required|date',
            'address' => 'nullable|string',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'teacher',
        ]);

        $employeeId = 'TCH-'.strtoupper(substr($validated['name'], 0, 3)).'-'.time();

        Teacher::create([
            'user_id' => $user->id,
            'employee_id' => $employeeId,
            'name' => $validated['name'],
            'qualification' => $validated['qualification'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'joining_date' => $validated['joining_date'],
            'address' => $validated['address'] ?? null,
        ]);

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Teacher created successfully');
    }

    public function edit(Teacher $teacher)
    {
        $teacher->load(['user']);

        return inertia('admin/teachers/edit', [
            'teacher' => $teacher,
        ]);
    }

    public function update(Request $request, Teacher $teacher)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($teacher->user_id)],
            'password' => 'nullable|min:6',
            'qualification' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'joining_date' => 'required|date',
            'address' => 'nullable|string',
        ]);

        $teacher->user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        if (! empty($validated['password'])) {
            $teacher->user->update(['password' => Hash::make($validated['password'])]);
        }

        $teacher->update([
            'name' => $validated['name'],
            'qualification' => $validated['qualification'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'joining_date' => $validated['joining_date'],
            'address' => $validated['address'] ?? null,
        ]);

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Teacher updated successfully');
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->user->delete();
        $teacher->delete();

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Teacher deleted successfully');
    }
}
