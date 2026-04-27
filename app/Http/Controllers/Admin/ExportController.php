<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Fee;
use App\Models\ParentModel;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ExportController extends Controller
{
    public function teachers()
    {
        $teachers = Teacher::with(['user', 'subjects', 'classes'])->get();

        $headers = ['Name', 'Employee ID', 'Email', 'Qualification', 'Phone', 'Joining Date', 'Subjects', 'Classes'];

        $rows = $teachers->map(function ($teacher) {
            return [
                $teacher->name,
                $teacher->employee_id,
                $teacher->user->email ?? '',
                $teacher->qualification ?? '',
                $teacher->phone ?? '',
                $teacher->joining_date,
                $teacher->subjects->pluck('name')->implode(', '),
                $teacher->classes->map(fn($c) => $c->name . ($c->section ? " ({$c->section})" : ''))->implode(', '),
            ];
        });

        return $this->downloadCsv('teachers', $headers, $rows);
    }

    public function students()
    {
        $students = Student::with(['user', 'class', 'parent'])->get();

        $headers = ['Name', 'Roll Number', 'Email', 'Class', 'Section', 'Gender', 'Date of Birth', 'Phone', 'Address', 'Admission Date', 'Parent Name'];

        $rows = $students->map(function ($student) {
            return [
                $student->name,
                $student->roll_number,
                $student->user->email ?? '',
                $student->class->name ?? '',
                $student->class->section ?? '',
                $student->gender ?? '',
                $student->date_of_birth ?? '',
                $student->phone ?? '',
                $student->address ?? '',
                $student->admission_date,
                $student->parent->name ?? '',
            ];
        });

        return $this->downloadCsv('students', $headers, $rows);
    }

    public function parents()
    {
        $parents = ParentModel::with(['user', 'students'])->get();

        $headers = ['Name', 'Email', 'Phone', 'Occupation', 'Address', 'Children'];

        $rows = $parents->map(function ($parent) {
            return [
                $parent->name,
                $parent->email,
                $parent->phone,
                $parent->occupation ?? '',
                $parent->address ?? '',
                $parent->students->pluck('name')->implode(', '),
            ];
        });

        return $this->downloadCsv('parents', $headers, $rows);
    }

    public function fees()
    {
        $fees = Fee::with(['student', 'student.class'])->get();

        $headers = ['Student Name', 'Roll Number', 'Class', 'Fee Type', 'Amount', 'Due Date', 'Status', 'Paid Date', 'Remarks'];

        $rows = $fees->map(function ($fee) {
            return [
                $fee->student->name ?? '',
                $fee->student->roll_number ?? '',
                $fee->student->class->name ?? '',
                $fee->fee_type,
                $fee->amount,
                $fee->due_date,
                $fee->status,
                $fee->paid_date ?? '',
                $fee->remarks ?? '',
            ];
        });

        return $this->downloadCsv('fees', $headers, $rows);
    }

    public function all()
    {
        $teachers = Teacher::with(['user'])->get();
        $students = Student::with(['user', 'class', 'parent'])->get();
        $parents = ParentModel::with(['students'])->get();
        $fees = Fee::with(['student'])->get();

        $csvData = [];
        $csvData[] = ['SCHOOL MANAGEMENT EXPORT'];
        $csvData[] = ['Generated: ' . now()->format('Y-m-d H:i:s')];
        $csvData[] = [];

        $csvData[] = ['TEACHERS'];
        $csvData[] = ['Name', 'Employee ID', 'Email', 'Qualification', 'Phone', 'Joining Date'];
        foreach ($teachers as $teacher) {
            $csvData[] = [
                $teacher->name,
                $teacher->employee_id,
                $teacher->user->email ?? '',
                $teacher->qualification ?? '',
                $teacher->phone ?? '',
                $teacher->joining_date,
            ];
        }
        $csvData[] = [];

        $csvData[] = ['STUDENTS'];
        $csvData[] = ['Name', 'Roll Number', 'Class', 'Section', 'Gender', 'Parent', 'Admission Date'];
        foreach ($students as $student) {
            $csvData[] = [
                $student->name,
                $student->roll_number,
                $student->class->name ?? '',
                $student->class->section ?? '',
                $student->gender ?? '',
                $student->parent->name ?? '',
                $student->admission_date,
            ];
        }
        $csvData[] = [];

        $csvData[] = ['PARENTS'];
        $csvData[] = ['Name', 'Email', 'Phone', 'Occupation', 'Children'];
        foreach ($parents as $parent) {
            $csvData[] = [
                $parent->name,
                $parent->email,
                $parent->phone,
                $parent->occupation ?? '',
                $parent->students->pluck('name')->implode(', '),
            ];
        }
        $csvData[] = [];

        $csvData[] = ['FEES'];
        $csvData[] = ['Student', 'Fee Type', 'Amount', 'Due Date', 'Status', 'Paid Date'];
        foreach ($fees as $fee) {
            $csvData[] = [
                $fee->student->name ?? '',
                $fee->fee_type,
                $fee->amount,
                $fee->due_date,
                $fee->status,
                $fee->paid_date ?? '',
            ];
        }

        return Response::make($csvData)
            ->withHeaders([
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment; filename="school_export_' . date('Y_m_d') . '.csv"',
            ]);
    }

    private function downloadCsv($filename, $headers, $rows)
    {
        $csvData = array_merge([$headers], $rows->toArray());

        return Response::make($csvData)
            ->withHeaders([
                'Content-Type' => 'text/csv',
                'Content-Disposition' => "attachment; filename=\"{$filename}_" . date('Y_m_d') . ".csv\"",
            ]);
    }
}