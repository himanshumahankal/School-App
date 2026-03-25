<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fee extends Model
{
    protected $fillable = [
        'student_id',
        'amount',
        'due_date',
        'status',
        'paid_date',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
