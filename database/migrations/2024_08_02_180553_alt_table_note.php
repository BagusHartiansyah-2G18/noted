<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AltTableNote extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('judul', function (Blueprint $table) {
            $table->string("jsCatatan","1")->default("1")->command("jenis sharing 1. private, 2. khusus, 3. public");
            $table->string("jsFEntri","1")->default("1")->command("jenis sharing Form Entri 1. form, 2. Form - Data"); 
            $table->text("dpCatatan")->default("eyJ4Y2F0YXRhbiI6MCwieGZvcm1VcGxvYWQiOjAsInhmb3JtRW50cmkiOjB9")->command("data Publikasi");
            $table->text("dpFEntri")->default("");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('judul', function (Blueprint $table) {
            //
        });
    }
}
