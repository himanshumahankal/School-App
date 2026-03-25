<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Classes Table
        Schema::create('school_classes', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., Class 10A
            $table->timestamps();
        });

        // Subjects Table
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->nullable();
            $table->timestamps();
        });

        // Teachers Table (Linked to User)
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->timestamps();
        });

        // Subject-Teacher-Class Mapping
        Schema::create('teacher_subject_class', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->foreignId('school_class_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // Parents Table (Linked to User)
        Schema::create('parents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('phone')->nullable();
            $table->string('occupation')->nullable();
            $table->timestamps();
        });

        // Students Table (Linked to User, Parent, and Class)
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('parent_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('school_class_id')->nullable()->constrained()->onDelete('set null');
            $table->string('roll_number')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->timestamps();
        });

        // Attendance Table
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->foreignId('school_class_id')->constrained()->onDelete('cascade');
            $table->date('attendance_date');
            $table->enum('status', ['present', 'absent', 'late'])->default('present');
            $table->timestamps();
        });

        // Exams Table
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., Final Exam 2026
            $table->date('exam_date');
            $table->foreignId('class_id')->nullable()->constrained('school_classes')->onDelete('cascade');
            $table->foreignId('subject_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('start_time')->nullable();
            $table->string('end_time')->nullable();
            $table->integer('total_marks')->nullable()->default(100);
            $table->timestamps();
        });

        // Exam Marks Table
        Schema::create('exam_marks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->decimal('marks', 5, 2);
            $table->timestamps();
        });

        // Fees Table
        Schema::create('fees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->date('due_date');
            $table->enum('status', ['paid', 'unpaid', 'partial'])->default('unpaid');
            $table->date('paid_date')->nullable();
            $table->timestamps();
        });

        // Announcements Table
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('message');
            $table->enum('target_role', ['all', 'teacher', 'parent', 'student'])->default('all');
            $table->timestamps();
        });

        // Study Materials / Assignments Table
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('file_path');
            $table->enum('type', ['assignment', 'study_material']);
            $table->enum('material_type', ['homework', 'project', 'assignment', 'notes', 'other'])->default('other');
            $table->foreignId('school_class_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->foreignId('teacher_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materials');
        Schema::dropIfExists('announcements');
        Schema::dropIfExists('fees');
        Schema::dropIfExists('exam_marks');
        Schema::dropIfExists('exams');
        Schema::dropIfExists('attendances');
        Schema::dropIfExists('students');
        Schema::dropIfExists('parents');
        Schema::dropIfExists('teacher_subject_class');
        Schema::dropIfExists('teachers');
        Schema::dropIfExists('subjects');
        Schema::dropIfExists('school_classes');
    }
};
