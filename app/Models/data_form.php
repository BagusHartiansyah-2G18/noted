<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class data_form extends Model
{
    use HasFactory;
    protected $table ="data_forms";
    protected $fillable = [
        'kd',
        'kdMember',
        'kdNote',
        'tingkat',
        'tujuan',
        'data',
        'qdata'
    ];

}
