<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDataFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_forms', function (Blueprint $table) {
            $table->string("kd",10);
            $table->string("kdMember",25);
            $table->string("kdNote",25);
            $table->string("tingkat",5);
            $table->string("tujuan",250);
            
            $table->text("data")->default("");
            $table->boolean("qdata")->default(1)->commant("kunci data / tidak terbuka untuk umum");
            $table->timestamps();
            $table->primary(['kdNote','kdMember','tingkat','kd']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('data_forms');
    }
}
