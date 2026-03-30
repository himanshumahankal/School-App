<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolClass;
use App\Models\Subject;
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
            $query->where('name', 'like', '%'.$request->search.'%')
                ->orWhere('employee_id', 'like', '%'.$request->search.'%');
        }

        $teachers = $query->orderBy('created_at', 'desc')->paginate(10);

        return inertia('admin/teachers/index', [
            'teachers' => $teachers,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $subjects = Subject::orderBy('name')->get(['id', 'name']);
        $classes = SchoolClass::orderBy('name')->get(['id', 'name', 'section']);

        return inertia('admin/teachers/create', [
            'subjects' => $subjects,
            'classes' => $classes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'employee_id' => 'required|unique:teachers,employee_id',
            'qualification' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'joining_date' => 'required|date',
            'address' => 'nullable|string',
            'subject_ids' => 'nullable|array',
            'class_ids' => 'nullable|array',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'teacher',
        ]);

        $teacher = Teacher::create([
            'user_id' => $user->id,
            'employee_id' => $validated['employee_id'],
            'name' => $validated['name'],
            'qualification' => $validated['qualification'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'joining_date' => $validated['joining_date'],
            'address' => $validated['address'] ?? null,
        ]);

        if (! empty($validated['subject_ids'])) {
            $teacher->subjects()->attach($validated['subject_ids']);
        }

        if (! empty($validated['class_ids'])) {
            $teacher->classes()->attach($validated['class_ids']);
        }

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Teacher created successfully');
    }

    public function edit(Teacher $teacher)
    {
        $teacher->load(['user', 'subjects', 'classes']);
        $subjects = Subject::orderBy('name')->get(['id', 'name']);
        $classes = SchoolClass::orderBy('name')->get(['id', 'name', 'section']);

        return inertia('admin/teachers/edit', [
            'teacher' => $teacher,
            'subjects' => $subjects,
            'classes' => $classes,
        ]);
    }

    public function update(Request $request, Teacher $teacher)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($teacher->user_id)],
            'password' => 'nullable|min:6',
            'employee_id' => ['required', Rule::unique('teachers')->ignore($teacher->id)],
            'qualification' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'joining_date' => 'required|date',
            'address' => 'nullable|string',
            'subject_ids' => 'nullable|array',
            'class_ids' => 'nullable|array',
        ]);

        $teacher->user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        if (! empty($validated['password'])) {
            $teacher->user->update(['password' => Hash::make($validated['password'])]);
        }

        $teacher->update([
            'employee_id' => $validated['employee_id'],
            'name' => $validated['name'],
            'qualification' => $validated['qualification'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'joining_date' => $validated['joining_date'],
            'address' => $validated['address'] ?? null,
        ]);

        $teacher->subjects()->sync($validated['subject_ids'] ?? []);
        $teacher->classes()->sync($validated['class_ids'] ?? []);

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
