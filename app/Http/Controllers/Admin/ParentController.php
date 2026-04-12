<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClassModel;
use App\Models\Student;
use App\Models\User;

class ParentController extends Controller
{
    public function index()
    {
        $classes = ClassModel::with('students.user', 'students.parents')
            ->get()
            ->map(function ($class) {
                return [
                    'id' => $class->id,
                    'name' => $class->name,
                    'section' => $class->section,
                ];
            });

        $parents = User::where('role', 'parent')
            ->with(['student.class'])
            ->get()
            ->map(function ($parent) {
                $student = $parent->student;

                return [
                    'id' => $parent->id,
                    'name' => $parent->name,
                    'email' => $parent->email,
                    'phone' => $parent->phone,
                    'occupation' => $parent->occupation,
                    'relation' => $parent->relation,
                    'student' => $student ? [
                        'id' => $student->id,
                        'name' => $student->name,
                        'roll_number' => $student->roll_number,
                        'class' => $student->class ? [
                            'id' => $student->class->id,
                            'name' => $student->class->name,
                            'section' => $student->class->section,
                        ] : null,
                    ] : null,
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
}
