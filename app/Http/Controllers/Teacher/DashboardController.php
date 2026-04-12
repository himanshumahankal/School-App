<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Teacher;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $teacher = Teacher::where('user_id', $user->id)->with(['subjects', 'classes'])->first();

        $subjects = $teacher ? $teacher->subjects : collect([]);
        $classes = $teacher ? $teacher->classes : collect([]);

        return inertia('teacher/dashboard', [
            'subjects' => $subjects,
            'classes' => $classes,
        ]);
    }
}
