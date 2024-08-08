<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class judul_file extends Model
{
    use HasFactory;
    protected $table ="judul_file";
    protected $fillable = [
        'kdMember',
        'kdJudul',
        'file',
        'keterangan',
        'ind',
        'kdMemberSub'
    ];
}
