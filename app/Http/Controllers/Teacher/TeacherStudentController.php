<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherStudentController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $teacher = Teacher::where('user_id', $user->id)->first();
        
        $teacherClassIds = $teacher?->classes()->pluck('school_classes.id') ?? [];
        
        $query = Student::with(['user', 'class', 'parent'])
            ->whereIn('class_id', $teacherClassIds);
        
        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', '%'.$request->search.'%');
        }
        
        if ($request->has('class_id') && $request->class_id) {
            $query->where('class_id', $request->class_id);
        }
        
        $students = $query->orderBy('class_id')->orderBy('roll_number')->get()->map(function ($student) {
            return [
                'id' => $student->id,
                'name' => $student->name,
                'roll_number' => $student->roll_number,
                'date_of_birth' => $student->date_of_birth,
                'gender' => $student->gender,
                'phone' => $student->phone,
                'address' => $student->address,
                'admission_date' => $student->admission_date,
                'class' => [
                    'id' => $student->class->id,
                    'name' => $student->class->name,
                    'section' => $student->class->section,
                ],
                'parent' => $student->parent ? [
                    'id' => $student->parent->id,
                    'name' => $student->parent->name,
                    'phone' => $student->parent->phone,
                ] : null,
            ];
        });
        
        $classes = $teacher?->classes->map(fn($c) => ['id' => $c->id, 'name' => $c->name, 'section' => $c->section]) ?? [];
        
        return inertia('teacher/students', [
            'students' => [
                'data' => $students,
                'total' => $students->count(),
            ],
            'classes' => $classes,
            'filters' => $request->only(['search', 'class_id']),
        ]);
    }
}