<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

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
        
        $classes = $teacher?->classes()->get()->unique('name')->map(fn($c) => ['id' => $c->id, 'name' => $c->name, 'section' => $c->section]) ?? [];
        
        return inertia('teacher/students', [
            'students' => [
                'data' => $students,
                'total' => $students->count(),
            ],
            'classes' => $classes,
            'filters' => $request->only(['search', 'class_id']),
        ]);
    }

    public function create()
    {
        $user = auth()->user();
        $teacher = Teacher::where('user_id', $user->id)->first();
        
        $classes = $teacher?->classes()->get()->unique('name')->map(fn($c) => ['id' => $c->id, 'name' => $c->name, 'section' => $c->section]) ?? [];
        
        return inertia('teacher/students-create', [
            'classes' => $classes,
        ]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        $teacher = Teacher::where('user_id', $user->id)->first();
        
        $teacherClassIds = $teacher?->classes()->pluck('school_classes.id') ?? [];
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'roll_number' => 'required|string|max:100',
            'class_id' => ['required', 'exists:school_classes,id', function ($attribute, $value, $fail) use ($teacherClassIds) {
                if (!in_array($value, $teacherClassIds->toArray())) {
                    $fail('You are not authorized to add students to this class.');
                }
            }],
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'admission_date' => 'required|date',
        ]);

        DB::transaction(function () use ($validated) {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make('student123'),
                'role' => 'student',
            ]);

            Student::create([
                'user_id' => $user->id,
                'class_id' => $validated['class_id'],
                'name' => $validated['name'],
                'roll_number' => $validated['roll_number'],
                'date_of_birth' => $validated['date_of_birth'] ?? null,
                'gender' => $validated['gender'] ?? null,
                'phone' => $validated['phone'] ?? null,
                'address' => $validated['address'] ?? null,
                'admission_date' => $validated['admission_date'],
            ]);
        });

        return redirect()->route('teacher.students')
            ->with('success', 'Student added successfully');
    }

    public function edit(Student $student)
    {
        $user = auth()->user();
        $teacher = Teacher::where('user_id', $user->id)->first();
        
        $teacherClassIds = $teacher?->classes()->pluck('school_classes.id') ?? [];
        
        if (!in_array($student->class_id, $teacherClassIds->toArray())) {
            abort(403, 'You are not authorized to edit this student.');
        }
        
        $classes = $teacher?->classes()->get()->unique('name')->map(fn($c) => ['id' => $c->id, 'name' => $c->name, 'section' => $c->section]) ?? [];
        
        $student->load(['user', 'class', 'parent']);
        
        return inertia('teacher/students-edit', [
            'student' => [
                'id' => $student->id,
                'name' => $student->name,
                'email' => $student->user->email ?? '',
                'roll_number' => $student->roll_number,
                'class_id' => $student->class_id,
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
            ],
            'classes' => $classes,
        ]);
    }

    public function update(Request $request, Student $student)
    {
        $user = auth()->user();
        $teacher = Teacher::where('user_id', $user->id)->first();
        
        $teacherClassIds = $teacher?->classes()->pluck('school_classes.id') ?? [];
        
        if (!in_array($student->class_id, $teacherClassIds->toArray())) {
            abort(403, 'You are not authorized to edit this student.');
        }
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$student->user_id,
            'roll_number' => 'required|string|max:100',
            'class_id' => ['required', 'exists:school_classes,id', function ($attribute, $value, $fail) use ($teacherClassIds) {
                if (!in_array($value, $teacherClassIds->toArray())) {
                    $fail('You are not authorized to add students to this class.');
                }
            }],
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'admission_date' => 'required|date',
        ]);

        DB::transaction(function () use ($validated, $student) {
            if ($student->user) {
                $student->user->update([
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                ]);
            }

            $student->update([
                'name' => $validated['name'],
                'class_id' => $validated['class_id'],
                'roll_number' => $validated['roll_number'],
                'date_of_birth' => $validated['date_of_birth'] ?? null,
                'gender' => $validated['gender'] ?? null,
                'phone' => $validated['phone'] ?? null,
                'address' => $validated['address'] ?? null,
                'admission_date' => $validated['admission_date'],
            ]);
        });

        return redirect()->route('teacher.students')
            ->with('success', 'Student updated successfully');
    }

    public function destroy(Student $student)
    {
        $user = auth()->user();
        $teacher = Teacher::where('user_id', $user->id)->first();
        
        $teacherClassIds = $teacher?->classes()->pluck('school_classes.id') ?? [];
        
        if (!in_array($student->class_id, $teacherClassIds->toArray())) {
            abort(403, 'You are not authorized to delete this student.');
        }

        DB::transaction(function () use ($student) {
            if ($student->user) {
                $student->user->delete();
            }
            $student->delete();
        });

        return redirect()->route('teacher.students')
            ->with('success', 'Student deleted successfully');
    }
}