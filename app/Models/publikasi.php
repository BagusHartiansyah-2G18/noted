<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class publikasi extends Model
{
    use HasFactory;
    protected $table ="publikasi";
    protected $fillable = [
        'kdMember',
        'kdJudul',
        'tingkat',
        'kdAnggota'
    ];
}
