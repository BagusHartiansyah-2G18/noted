<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSpjsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('publikasi', function (Blueprint $table) {
            $table->string("kdJudul","250");
            $table->string("kdMember","25");
            $table->string("tingkat","5");
            $table->string("kdAnggota","25"); 
            $table->timestamps();

            $table->primary(["kdJudul","kdMember","tingkat","kdAnggota"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('spjs');
    }
}
