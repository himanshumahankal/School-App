<?php

use App\Http\Controllers\Admin\ParentController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Chat\ChatController;
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
        Route::get('dashboard', fn () => Inertia::render('admin/dashboard'))->name('dashboard');
        Route::get('chat', [ChatController::class, 'index'])->name('chat');

        Route::resource('teachers', TeacherController::class);
        Route::resource('students', StudentController::class);
        Route::resource('parents', ParentController::class);
    });

    Route::prefix('teacher')->name('teacher.')->middleware('role:teacher')->group(function () {
        Route::get('dashboard', fn () => Inertia::render('teacher/dashboard'))->name('dashboard');
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

    Route::post('chat/send', [ChatController::class, 'sendMessage'])->name('chat.send');
    Route::get('chat/group/{id}', [ChatController::class, 'getMessages'])->name('chat.messages');
});
