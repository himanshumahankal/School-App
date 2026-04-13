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

        $students = $query->orderBy('created_at', 'desc')->paginate(10);
        $classes = SchoolClass::orderBy('name')->get(['id', 'name', 'section']);
        $uniqueClasses = $classes->unique('name')->values();

        return inertia('admin/students/index', [
            'students' => $students,
            'classes' => $uniqueClasses,
            'filters' => $request->only(['search', 'class']),
        ]);
    }
}
