<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateValueFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('value_forms', function (Blueprint $table) {
            $table->string("kd",10);
            $table->string("kdDF",35)->command('kode Data From');
            $table->string("kdMember",25);
            $table->text("data");
            $table->timestamps();
            $table->primary(["kd","kdMember","kdDF"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('value_forms');
    }
}
