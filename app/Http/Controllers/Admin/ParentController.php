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
    public function index()
    {
        $classes = SchoolClass::orderBy('name')->get(['id', 'name', 'section']);

        $parents = ParentModel::with(['user', 'students.class'])
            ->get()
            ->map(function ($parent) {
                $firstStudent = $parent->students->first();

                return [
                    'id' => $parent->id,
                    'user_id' => $parent->user_id,
                    'name' => $parent->name,
                    'email' => $parent->email,
                    'phone' => $parent->phone,
                    'occupation' => $parent->occupation,
                    'address' => $parent->address,
                    'relation' => $firstStudent ? $firstStudent->pivot->relation : null,
                    'user' => [
                        'email' => $parent->user->email ?? null,
                    ],
                    'students' => $parent->students->map(function ($student) {
                        return [
                            'id' => $student->id,
                            'name' => $student->name,
                            'roll_number' => $student->roll_number,
                            'class' => $student->class ? [
                                'id' => $student->class->id,
                                'name' => $student->class->name,
                                'section' => $student->class->section,
                            ] : null,
                            'relation' => $student->pivot->relation,
                        ];
                    }),
                ];
            });

        $students = Student::with('class')
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
                'data' => $parents,
                'total' => $parents->count(),
            ],
            'classes' => $classes,
            'students' => $students,
        ]);
    }

    public function create()
    {
        $classes = SchoolClass::orderBy('name')->get(['id', 'name', 'section']);

        $students = Student::with('class')
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
            'students' => $students,
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

        $parent->students()->attach($validated['student_id'], ['relation' => $validated['relation']]);

        return redirect()->route('admin.parents.index')
            ->with('success', 'Parent added successfully');
    }

    public function edit(ParentModel $parent)
    {
        $parent->load(['user', 'students.class']);

        $classes = SchoolClass::orderBy('name')->get(['id', 'name', 'section']);

        $students = Student::with('class')
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
                'students' => $parent->students->map(function ($student) {
                    return [
                        'id' => $student->id,
                        'name' => $student->name,
                        'roll_number' => $student->roll_number,
                        'class' => $student->class ? [
                            'id' => $student->class->id,
                            'name' => $student->class->name,
                            'section' => $student->class->section,
                        ] : null,
                        'relation' => $student->pivot->relation,
                    ];
                }),
            ],
            'classes' => $classes,
            'students' => $students,
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

        $parent->students()->sync([$validated['student_id'] => ['relation' => $validated['relation']]]);

        return redirect()->route('admin.parents.index')
            ->with('success', 'Parent updated successfully');
    }

    public function destroy(ParentModel $parent)
    {
        $parent->user->delete();
        $parent->students()->detach();
        $parent->delete();

        return redirect()->route('admin.parents.index')
            ->with('success', 'Parent deleted successfully');
    }
}
