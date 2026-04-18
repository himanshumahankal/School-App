<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolClass;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $query = Student::with(['user', 'class', 'parent']);

        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', '%'.$request->search.'%')
                ->orWhere('roll_number', 'like', '%'.$request->search.'%');
        }

        if ($request->has('class') && $request->class) {
            $query->whereHas('class', function ($q) use ($request) {
                $q->where('name', $request->class);
            });
        }

        $allStudents = $query->orderBy('created_at', 'desc')->get()->map(function ($student) {
            return [
                'id' => $student->id,
                'name' => $student->name,
                'roll_number' => $student->roll_number,
                'date_of_birth' => $student->date_of_birth,
                'gender' => $student->gender,
                'admission_date' => $student->admission_date,
                'user' => [
                    'email' => $student->user->email ?? null,
                ],
                'class' => $student->class ? [
                    'id' => $student->class->id,
                    'name' => $student->class->name,
                    'section' => $student->class->section,
                ] : null,
                'parent' => $student->parent ? [
                    'id' => $student->parent->id,
                    'name' => $student->parent->name,
                ] : null,
            ];
        });

        $classes = SchoolClass::select('name')->distinct()->orderBy('name')->get();

        return inertia('admin/students/index', [
            'students' => [
                'data' => $allStudents,
                'total' => $allStudents->count(),
            ],
            'classes' => $classes,
            'filters' => $request->only(['search', 'class']),
        ]);
    }

    public function create()
    {
        $classes = SchoolClass::orderBy('name')->get(['id', 'name', 'section']);
        return inertia('admin/students/create', [
            'classes' => $classes,
        ]);
    }

    public function store(Request $request)
    {
        // For now, at least define it to avoid errors if the button is clicked.
        // We can add actual validation and storage if needed, but the priority is the UI.
        return redirect()->route('admin.students.index')->with('success', 'Student created successfully (stub)');
    }

    public function show(Student $student)
    {
        $student->load(['user', 'class', 'parent']);
        return inertia('admin/students/show', [
            'student' => $student,
        ]);
    }

    public function edit(Student $student)
    {
        $student->load(['user', 'class', 'parent']);
        $classes = SchoolClass::orderBy('name')->get(['id', 'name', 'section']);
        return inertia('admin/students/edit', [
            'student' => $student,
            'classes' => $classes,
        ]);
    }

    public function update(Request $request, Student $student)
    {
        return redirect()->route('admin.students.index')->with('success', 'Student updated successfully (stub)');
    }

    public function destroy(Student $student)
    {
        if ($student->user) {
            $student->user->delete();
        }
        $student->delete();

        return redirect()->route('admin.students.index')
            ->with('success', 'Student deleted successfully');
    }
}

