<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ParentModel;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ParentController extends Controller
{
    public function index(Request $request)
    {
        $classes = SchoolClass::select('name')->distinct()->orderBy('name')->get();

        $query = ParentModel::with(['user', 'student.class']);

        if ($request->has('class') && $request->class) {
            $query->whereHas('student.class', function ($q) use ($request) {
                $q->where('name', $request->class);
            });
        }

        $allParents = $query->get()->map(function ($parent) {
            $student = $parent->student;

            return [
                'id' => $parent->id,
                'user_id' => $parent->user_id,
                'name' => $parent->name,
                'email' => $parent->email,
                'phone' => $parent->phone,
                'occupation' => $parent->occupation,
                'address' => $parent->address,
                'relation' => $student ? $student->relation : null,
                'user' => [
                    'email' => $parent->user->email ?? null,
                ],
                'student' => $student ? [
                    'id' => $student->id,
                    'name' => $student->name,
                    'roll_number' => $student->roll_number,
                    'class' => $student->class ? [
                        'id' => $student->class->id,
                        'name' => $student->class->name,
                        'section' => $student->class->section,
                    ] : null,
                    'relation' => $student->relation,
                ] : null,
            ];
        });

        $studentsWithoutParent = Student::with('class')
            ->whereNull('parent_id')
            ->get()
            ->map(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'roll_number' => $student->roll_number,
                    'class' => $student->class ? [
                        'id' => $student->class->id,
                        'name' => $student->class->name,
                        'section' => $student->class->section,
                    ] : null,
                ];
            });

        return inertia('admin/parents/index', [
            'parents' => [
                'data' => $allParents,
                'total' => $allParents->count(),
            ],
            'classes' => $classes,
            'availableStudents' => $studentsWithoutParent,
            'filters' => $request->only(['class']),
        ]);
    }

    public function create()
    {
        $classes = SchoolClass::orderBy('name')->get(['id', 'name', 'section']);

        $studentsWithoutParent = Student::with('class')
            ->whereNull('parent_id')
            ->get()
            ->map(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'roll_number' => $student->roll_number,
                    'class' => $student->class ? [
                        'id' => $student->class->id,
                        'name' => $student->class->name,
                        'section' => $student->class->section,
                    ] : null,
                ];
            });

        return inertia('admin/parents/create', [
            'classes' => $classes,
            'availableStudents' => $studentsWithoutParent,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'phone' => 'nullable|string|max:20',
            'occupation' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'student_id' => 'required|exists:students,id',
            'relation' => 'required|string|max:50',
        ]);

        $student = Student::find($validated['student_id']);

        if ($student->parent_id) {
            return back()->withErrors(['student_id' => 'This student already has a parent assigned.']);
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'parent',
        ]);

        $parent = ParentModel::create([
            'user_id' => $user->id,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'occupation' => $validated['occupation'] ?? null,
            'address' => $validated['address'] ?? null,
        ]);

        $student->update([
            'parent_id' => $parent->id,
            'relation' => $validated['relation'],
        ]);

        return redirect()->route('admin.parents.index')
            ->with('success', 'Parent added successfully');
    }

    public function edit(ParentModel $parent)
    {
        $parent->load(['user', 'student.class']);

        $classes = SchoolClass::orderBy('name')->get(['id', 'name', 'section']);

        $allStudents = Student::with('class')
            ->get()
            ->map(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'roll_number' => $student->roll_number,
                    'class' => $student->class ? [
                        'id' => $student->class->id,
                        'name' => $student->class->name,
                        'section' => $student->class->section,
                    ] : null,
                ];
            });

        return inertia('admin/parents/edit', [
            'parent' => [
                'id' => $parent->id,
                'user_id' => $parent->user_id,
                'name' => $parent->name,
                'email' => $parent->email,
                'phone' => $parent->phone,
                'occupation' => $parent->occupation,
                'address' => $parent->address,
                'user' => [
                    'email' => $parent->user->email ?? null,
                ],
                'student' => $parent->student ? [
                    'id' => $parent->student->id,
                    'name' => $parent->student->name,
                    'roll_number' => $parent->student->roll_number,
                    'class' => $parent->student->class ? [
                        'id' => $parent->student->class->id,
                        'name' => $parent->student->class->name,
                        'section' => $parent->student->class->section,
                    ] : null,
                    'relation' => $parent->student->relation,
                ] : null,
            ],
            'classes' => $classes,
            'allStudents' => $allStudents,
        ]);
    }

    public function update(Request $request, ParentModel $parent)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($parent->user_id)],
            'password' => 'nullable|min:6',
            'phone' => 'nullable|string|max:20',
            'occupation' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'student_id' => 'required|exists:students,id',
            'relation' => 'required|string|max:50',
        ]);

        $newStudent = Student::find($validated['student_id']);

        if ($newStudent->parent_id && $newStudent->parent_id !== $parent->id) {
            return back()->withErrors(['student_id' => 'This student already has a parent assigned.']);
        }

        $parent->user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        if (! empty($validated['password'])) {
            $parent->user->update(['password' => Hash::make($validated['password'])]);
        }

        $parent->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'occupation' => $validated['occupation'] ?? null,
            'address' => $validated['address'] ?? null,
        ]);

        if ($parent->student) {
            $parent->student->update(['parent_id' => null, 'relation' => null]);
        }

        $newStudent->update([
            'parent_id' => $parent->id,
            'relation' => $validated['relation'],
        ]);

        return redirect()->route('admin.parents.index')
            ->with('success', 'Parent updated successfully');
    }

    public function destroy(ParentModel $parent)
    {
        if ($parent->student) {
            $parent->student->update(['parent_id' => null, 'relation' => null]);
        }

        $parent->user->delete();
        $parent->delete();

        return redirect()->route('admin.parents.index')
            ->with('success', 'Parent deleted successfully');
    }
}
