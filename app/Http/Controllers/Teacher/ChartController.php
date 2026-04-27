<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\SchoolClass;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChartController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $teacher = Teacher::where('user_id', $user->id)->first();
        
        $teacherClassIds = $teacher?->classes()->pluck('school_classes.id') ?? [];
        
        $attendanceData = [];
        $last7Days = now()->subDays(6)->toDaysInterval(6);
        
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i)->toDateString();
            $total = Student::whereIn('class_id', $teacherClassIds)->count();
            $present = Attendance::whereIn('class_id', $teacherClassIds)
                ->whereDate('date', $date)
                ->where('status', 'present')
                ->count();
            
            $attendanceData[] = [
                'date' => now()->subDays($i)->format('M d'),
                'present' => $total > 0 ? round(($present / $total) * 100) : 0,
                'absent' => $total > 0 ? round((($total - $present) / $total) * 100) : 0,
            ];
        }
        
        $classStats = [];
        $classes = SchoolClass::whereIn('id', $teacherClassIds)->get();
        
        foreach ($classes as $class) {
            $totalStudents = Student::where('class_id', $class->id)->count();
            $presentToday = Attendance::where('class_id', $class->id)
                ->whereDate('date', now()->toDateString())
                ->where('status', 'present')
                ->count();
            
            $classStats[] = [
                'name' => $class->name,
                'total' => $totalStudents,
                'present' => $presentToday,
                'percentage' => $totalStudents > 0 ? round(($presentToday / $totalStudents) * 100) : 0,
            ];
        }
        
        return Inertia::render('teacher/charts', [
            'attendanceData' => $attendanceData,
            'classStats' => $classStats,
        ]);
    }
}