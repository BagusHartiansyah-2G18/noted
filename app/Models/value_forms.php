<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class value_forms extends Model
{
    use HasFactory;
    protected $table ="value_forms";
    protected $fillable = [
        'kd',
        'kdMember',
        'kdDF', 
        'data'
    ];
    protected $casts = [
        'kd' => 'integer',
    ];

    
}
