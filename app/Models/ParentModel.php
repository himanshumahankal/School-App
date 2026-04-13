<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ParentModel extends Model
{
    use HasFactory;

    protected $table = 'parents';

    protected $fillable = ['user_id', 'name', 'email', 'phone', 'occupation', 'address'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function student(): HasOne
    {
        return $this->hasOne(Student::class);
    }
}
