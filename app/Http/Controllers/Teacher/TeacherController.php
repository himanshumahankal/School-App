<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Material;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index()
    {
        $teacher = auth()->user();
        $studentsCount = User::where('role', 'student')->count();
        $materialsCount = Material::where('teacher_id', $teacher->id)->count();

        return Inertia::render('teacher/dashboard', [
            'studentsCount' => $studentsCount,
            'materialsCount' => $materialsCount
        ]);
    }

    public function students()
    {
        $students = User::where('role', 'student')->with('studentProfile')->get();

        return Inertia::render('teacher/students/index', [
            'students' => $students
        ]);
    }

    public function createStudent()
    {
        $classes = SchoolClass::all();

        return Inertia::render('teacher/students/create', [
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
            'password' => bcrypt('123456'),
            'role' => 'student',
        ]);

        Student::create([
            'user_id' => $user->id,
            'phone' => $request->phone,
            'address' => $request->address,
            'school_class_id' => $request->school_class_id,
            'roll_number' => $request->roll_number,
        ]);

        return redirect()->route('teacher.students.index')->with('success', 'Student added successfully with default password: 123456');
    }

    public function editStudent(User $user)
    {
        $user->load('studentProfile');
        $classes = SchoolClass::all();

        return Inertia::render('teacher/students/edit', [
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

        return redirect()->route('teacher.students.index')->with('success', 'Student updated successfully');    
    }

    public function destroyStudent(User $user)
    {
        if ($user->studentProfile) {
            $user->studentProfile->delete();
        }
        $user->delete();

        return redirect()->route('teacher.students.index')->with('success', 'Student deleted successfully');    
    }

    public function materials()
    {
        $teacher = auth()->user();
        $materials = Material::where('teacher_id', $teacher->id)->with('schoolClass', 'subject')->orderBy('created_at', 'desc')->get();
        $classes = SchoolClass::all();
        $subjects = Subject::all();

        return Inertia::render('teacher/materials/index', [
            'materials' => $materials,
            'classes' => $classes,
            'subjects' => $subjects
        ]);
    }

    public function storeMaterial(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:homework,project,assignment,notes,other',
            'school_class_id' => 'required|exists:school_classes,id',
            'subject_id' => 'required|exists:subjects,id',
            'description' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:10240',
        ]);

        $filePath = null;
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time().'_'.$file->getClientOriginalName();
            $filePath = $file->storeAs('materials', $fileName, 'public');
        }

        Material::create([
            'title' => $request->title,
            'type' => $request->type,
            'school_class_id' => $request->school_class_id,
            'subject_id' => $request->subject_id,
            'description' => $request->description,
            'file_path' => $filePath,
            'teacher_id' => auth()->id(),
        ]);

        return redirect()->route('teacher.materials.index')->with('success', 'Study material added successfully');
    }

    public function destroyMaterial(Material $material)
    {
        $material->delete();

        return redirect()->route('teacher.materials.index')->with('success', 'Material deleted successfully');  
    }
}
