<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Models\Fee;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/dashboard', [
            'teacherCount' => User::where('role', 'teacher')->count(),
            'studentCount' => User::where('role', 'student')->count(),
            'parentCount' => User::where('role', 'parent')->count(),
        ]);
    }

    public function teachers()
    {
        $teachers = User::where('role', 'teacher')->with('teacherProfile')->get();

        return Inertia::render('admin/teachers/index', [
            'teachers' => $teachers
        ]);
    }

    public function createTeacher()
    {
        return Inertia::render('admin/teachers/create');
    }

    public function storeTeacher(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make('123456'),
            'role' => 'teacher',
        ]);

        Teacher::create([
            'user_id' => $user->id,
            'phone' => $request->phone,
            'address' => $request->address,
        ]);

        return redirect()->route('admin.teachers.index')->with('success', 'Teacher added successfully with default password: 123456');
    }

    public function editTeacher(User $user)
    {
        $user->load('teacherProfile');
        return Inertia::render('admin/teachers/edit', [
            'user' => $user
        ]);
    }

    public function updateTeacher(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,'.$user->id,
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

        $user->update([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
        ]);

        if ($user->teacherProfile) {
            $user->teacherProfile->update([
                'phone' => $request->phone,
                'address' => $request->address,
            ]);
        }

        return redirect()->route('admin.teachers.index')->with('success', 'Teacher updated successfully');      
    }

    public function destroyTeacher(User $user)
    {
        if ($user->teacherProfile) {
            $user->teacherProfile->delete();
        }
        $user->delete();

        return redirect()->route('admin.teachers.index')->with('success', 'Teacher deleted successfully');      
    }

    public function students()
    {
        $students = User::where('role', 'student')->with('studentProfile.schoolClass')->get();
        $classes = SchoolClass::all();

        return Inertia::render('admin/students/index', [
            'students' => $students,
            'classes' => $classes
        ]);
    }

    public function createStudent()
    {
        $classes = SchoolClass::all();

        return Inertia::render('admin/students/create', [
            'classes' => $classes
        ]);
    }

    public function storeStudent(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'school_class_id' => 'nullable|exists:school_classes,id',
            'roll_number' => 'nullable|string|max:50',
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make('123456'),
            'role' => 'student',
        ]);

        Student::create([
            'user_id' => $user->id,
            'phone' => $request->phone,
            'address' => $request->address,
            'school_class_id' => $request->school_class_id,
            'roll_number' => $request->roll_number,
        ]);

        return redirect()->route('admin.students.index')->with('success', 'Student added successfully with default password: 123456');
    }

    public function editStudent(User $user)
    {
        $user->load('studentProfile');
        $classes = SchoolClass::all();

        return Inertia::render('admin/students/edit', [
            'user' => $user,
            'classes' => $classes
        ]);
    }

    public function updateStudent(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,'.$user->id,
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'school_class_id' => 'nullable|exists:school_classes,id',
            'roll_number' => 'nullable|string|max:50',
        ]);

        $user->update([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
        ]);

        if ($user->studentProfile) {
            $user->studentProfile->update([
                'phone' => $request->phone,
                'address' => $request->address,
                'school_class_id' => $request->school_class_id,
                'roll_number' => $request->roll_number,
            ]);
        }

        return redirect()->route('admin.students.index')->with('success', 'Student updated successfully');      
    }

    public function destroyStudent(User $user)
    {
        if ($user->studentProfile) {
            $user->studentProfile->delete();
        }
        $user->delete();

        return redirect()->route('admin.students.index')->with('success', 'Student deleted successfully');
    }

    public function exams()
    {
        $exams = Exam::with('schoolClass', 'subject')->orderBy('exam_date', 'desc')->get();
        $classes = SchoolClass::all();
        $subjects = Subject::all();

        return Inertia::render('admin/exams/index', [
            'exams' => $exams,
            'classes' => $classes,
            'subjects' => $subjects
        ]);
    }

    public function storeExam(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'class_id' => 'required|exists:school_classes,id',
            'subject_id' => 'required|exists:subjects,id',
            'exam_date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'total_marks' => 'required|integer|min:1',
        ]);

        Exam::create([
            'name' => $request->name,
            'class_id' => $request->class_id,
            'subject_id' => $request->subject_id,
            'exam_date' => $request->exam_date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'total_marks' => $request->total_marks,
        ]);

        return redirect()->route('admin.exams.index')->with('success', 'Exam timetable added successfully');    
    }

    public function destroyExam(Exam $exam)
    {
        $exam->delete();

        return redirect()->route('admin.exams.index')->with('success', 'Exam deleted successfully');
    }

    public function fees()
    {
        $fees = Fee::with('student.user')->orderBy('created_at', 'desc')->get();

        return Inertia::render('admin/fees/index', [
            'fees' => $fees
        ]);
    }
}
