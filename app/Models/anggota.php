<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class anggota extends Model
{
    use HasFactory;
    
    protected $table ="anggotas";
    protected $fillable = [
        'id',
        'idAdd',
        'idAdded',
        'status',
        'aktif'
    ];
}
