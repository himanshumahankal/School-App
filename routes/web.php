<?php

use App\Http\Controllers\Admin\ExportController;
use App\Http\Controllers\Admin\FeeController;
use App\Http\Controllers\Admin\ParentController;
use App\Http\Controllers\Admin\StudentController as AdminStudentController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Chat\ChatController;
use App\Http\Controllers\Teacher\ChartController;
use App\Http\Controllers\Teacher\TeacherStudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/about', fn () => Inertia::render('about'))->name('about');
Route::get('/contact', fn () => Inertia::render('contact'))->name('contact');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        $redirectMap = [
            'admin' => 'admin/dashboard',
            'teacher' => 'teacher/dashboard',
            'parent' => 'parent/dashboard',
            'student' => 'student/dashboard',
        ];

        return redirect($redirectMap[$user->role] ?? '/dashboard');
    })->name('dashboard');

    Route::get('chat', [ChatController::class, 'index'])->name('chat');

    Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {
        Route::get('dashboard', function () {
            $stats = [
                'totalTeachers' => \App\Models\Teacher::count(),
                'totalStudents' => \App\Models\Student::count(),
                'totalParents' => \App\Models\ParentModel::count(),
                'totalFees' => \App\Models\Fee::sum('amount'),
                'pendingFees' => \App\Models\Fee::where('status', 'pending')->sum('amount'),
            ];
            return inertia('admin/dashboard', ['stats' => $stats]);
        })->name('dashboard');
        Route::get('chat', [ChatController::class, 'index'])->name('chat');

        Route::get('export/teachers', [ExportController::class, 'teachers'])->name('export.teachers');
        Route::get('export/students', [ExportController::class, 'students'])->name('export.students');
        Route::get('export/parents', [ExportController::class, 'parents'])->name('export.parents');
        Route::get('export/fees', [ExportController::class, 'fees'])->name('export.fees');
        Route::get('export/all', [ExportController::class, 'all'])->name('export.all');

        Route::resource('teachers', TeacherController::class);
        Route::resource('students', AdminStudentController::class);
        Route::resource('parents', ParentController::class);
        Route::resource('fees', FeeController::class);
    });

    Route::prefix('teacher')->name('teacher.')->middleware('role:teacher')->group(function () {
        Route::get('dashboard', function () {
            $user = auth()->user();
            $teacher = \App\Models\Teacher::where('user_id', $user->id)->first();
            
            $stats = [
                'totalStudents' => 0,
                'todayAttendance' => 0,
                'pendingAssignments' => 0,
                'totalMaterials' => 0,
            ];
            
            if ($teacher) {
                $teacherClassIds = $teacher->classes()->pluck('school_classes.id');
                
                $stats['totalStudents'] = \App\Models\Student::whereIn('class_id', $teacherClassIds)->count();
                $stats['totalMaterials'] = \App\Models\Material::whereIn('class_id', $teacherClassIds)->count();
                
                $today = now()->toDateString();
                $stats['todayAttendance'] = \App\Models\Attendance::whereIn('class_id', $teacherClassIds)
                    ->whereDate('date', $today)
                    ->where('status', 'present')
                    ->count();
            }
            
            return inertia('teacher/dashboard', ['stats' => $stats]);
        })->name('dashboard');
        
        Route::get('charts', [ChartController::class, 'index'])->name('charts');
        Route::get('students', [TeacherStudentController::class, 'index'])->name('students');
        Route::get('attendance', fn () => Inertia::render('teacher/attendance'))->name('attendance');
        Route::get('materials', fn () => Inertia::render('teacher/materials'))->name('materials');
        Route::get('assignments', fn () => Inertia::render('teacher/assignments'))->name('assignments');
        
        Route::get('chat', [ChatController::class, 'index'])->name('chat');
    });

    Route::prefix('parent')->name('parent.')->middleware('role:parent')->group(function () {
        Route::get('dashboard', fn () => Inertia::render('parent/dashboard'))->name('dashboard');
        Route::get('chat', [ChatController::class, 'index'])->name('chat');
    });

    Route::prefix('student')->name('student.')->middleware('role:student')->group(function () {
        Route::get('dashboard', fn () => Inertia::render('student/dashboard'))->name('dashboard');
        Route::get('chat', [ChatController::class, 'index'])->name('chat');
    });

    Route::middleware(['auth'])->group(function () {
        Route::get('chat/groups', [ChatController::class, 'getGroups'])->name('chat.groups');
        Route::post('chat/send', [ChatController::class, 'sendMessage'])->name('chat.send')->middleware('csrf-exempt');
        Route::post('chat/like', [ChatController::class, 'toggleLike'])->name('chat.like')->middleware('csrf-exempt');
        Route::get('chat/group/{id}', [ChatController::class, 'getMessages'])->name('chat.messages');
    });
});
