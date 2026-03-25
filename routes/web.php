<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Parent\ParentController;
use App\Http\Controllers\Student\StudentController;
use App\Http\Controllers\Teacher\TeacherController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        $role = Auth::user()->role;
        return redirect()->route($role . '.dashboard');
    })->name('dashboard');

    // Admin Routes
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');
        Route::get('/teachers', [AdminController::class, 'teachers'])->name('teachers.index');
        Route::get('/teachers/create', [AdminController::class, 'createTeacher'])->name('teachers.create');
        Route::post('/teachers', [AdminController::class, 'storeTeacher'])->name('teachers.store');
        Route::get('/teachers/{user}/edit', [AdminController::class, 'editTeacher'])->name('teachers.edit');        
        Route::put('/teachers/{user}', [AdminController::class, 'updateTeacher'])->name('teachers.update');
        Route::delete('/teachers/{user}', [AdminController::class, 'destroyTeacher'])->name('teachers.destroy');    

        Route::get('/students', [AdminController::class, 'students'])->name('students.index');
        Route::get('/students/create', [AdminController::class, 'createStudent'])->name('students.create');
        Route::post('/students', [AdminController::class, 'storeStudent'])->name('students.store');
        Route::get('/students/{user}/edit', [AdminController::class, 'editStudent'])->name('students.edit');        
        Route::put('/students/{user}', [AdminController::class, 'updateStudent'])->name('students.update');
        Route::delete('/students/{user}', [AdminController::class, 'destroyStudent'])->name('students.destroy');    

        Route::get('/exams', [AdminController::class, 'exams'])->name('exams.index');
        Route::post('/exams', [AdminController::class, 'storeExam'])->name('exams.store');
        Route::delete('/exams/{exam}', [AdminController::class, 'destroyExam'])->name('exams.destroy');

        Route::get('/fees', [AdminController::class, 'fees'])->name('fees.index');
    });

    // Teacher Routes
    Route::middleware(['role:teacher'])->prefix('teacher')->name('teacher.')->group(function () {
        Route::get('/dashboard', [TeacherController::class, 'index'])->name('dashboard');
        Route::get('/students', [TeacherController::class, 'students'])->name('students.index');
        Route::get('/students/create', [TeacherController::class, 'createStudent'])->name('students.create');       
        Route::post('/students', [TeacherController::class, 'storeStudent'])->name('students.store');
        Route::get('/students/{user}/edit', [TeacherController::class, 'editStudent'])->name('students.edit');      
        Route::put('/students/{user}', [TeacherController::class, 'updateStudent'])->name('students.update');       
        Route::delete('/students/{user}', [TeacherController::class, 'destroyStudent'])->name('students.destroy');  
        Route::get('/materials', [TeacherController::class, 'materials'])->name('materials.index');
        Route::post('/materials', [TeacherController::class, 'storeMaterial'])->name('materials.store');
        Route::delete('/materials/{material}', [TeacherController::class, 'destroyMaterial'])->name('materials.destroy');
    });

    // Parent Routes
    Route::middleware(['role:parent'])->prefix('parent')->name('parent.')->group(function () {
        Route::get('/dashboard', [ParentController::class, 'index'])->name('dashboard');
    });

    // Student Routes
    Route::middleware(['role:student'])->prefix('student')->name('student.')->group(function () {
        Route::get('/dashboard', [StudentController::class, 'index'])->name('dashboard');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
