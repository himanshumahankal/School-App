<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Fee;
use App\Models\Student;
use Illuminate\Http\Request;

class FeeController extends Controller
{
    public function index(Request $request)
    {
        $query = Fee::with(['student.user', 'student.class']);

        if ($request->has('search') && $request->search) {
            $query->whereHas('student', function ($q) use ($request) {
                $q->where('name', 'like', '%'.$request->search.'%');
            });
        }

        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        $allFees = $query->orderBy('created_at', 'desc')->get()->map(function ($fee) {
            return [
                'id' => $fee->id,
                'fee_type' => $fee->fee_type,
                'amount' => $fee->amount,
                'due_date' => $fee->due_date,
                'status' => $fee->status,
                'paid_date' => $fee->paid_date,
                'remarks' => $fee->remarks,
                'student' => [
                    'id' => $fee->student->id,
                    'name' => $fee->student->name,
                    'roll_number' => $fee->student->roll_number,
                    'class' => [
                        'name' => $fee->student->class?->name,
                    ],
                ],
            ];
        });

        return inertia('admin/fees/index', [
            'fees' => [
                'data' => $allFees,
                'total' => $allFees->count(),
            ],
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        $students = Student::with(['user', 'class'])->get()->map(function ($student) {
            return [
                'id' => $student->id,
                'name' => $student->name,
                'roll_number' => $student->roll_number,
                'class' => [
                    'name' => $student->class?->name,
                ],
            ];
        });

        return inertia('admin/fees/create', [
            'students' => $students,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'fee_type' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'due_date' => 'required|date',
            'status' => 'required|in:pending,paid',
            'paid_date' => 'nullable|date',
            'remarks' => 'nullable|string',
        ]);

        Fee::create($validated);

        return redirect()->route('admin.fees.index')
            ->with('success', 'Fee created successfully');
    }

    public function edit(Fee $fee)
    {
        $fee->load(['student']);

        return inertia('admin/fees/edit', [
            'fee' => $fee,
        ]);
    }

    public function update(Request $request, Fee $fee)
    {
        $validated = $request->validate([
            'fee_type' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'due_date' => 'required|date',
            'status' => 'required|in:pending,paid',
            'paid_date' => 'nullable|date',
            'remarks' => 'nullable|string',
        ]);

        $fee->update($validated);

        return redirect()->route('admin.fees.index')
            ->with('success', 'Fee updated successfully');
    }

    public function destroy(Fee $fee)
    {
        $fee->delete();

        return redirect()->route('admin.fees.index')
            ->with('success', 'Fee deleted successfully');
    }
}