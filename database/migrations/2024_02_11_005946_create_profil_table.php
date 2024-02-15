<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateProfilTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profil', function (Blueprint $table) {
            $table->string('kdMember',25);
            $table->string('nama',150);
            $table->string('noHP',25);
            $table->string('img',155);
            $table->integer('ind',5)->comment('ind perubahan');
            $table->boolean('on')->default(1)->comment('aktif');
            $table->timestamps();
            // $table->primary(['kdMember','ind','on']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profil');
    }
}
