<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJudulFileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('judul_file', function (Blueprint $table) {
            $table->string('kdJudul',150);
            $table->string('kdMember',25);
            $table->string('kdMemberSub',25)->comment('member ajakan yang add');
            $table->string('file',250);
            $table->string('keterangan',25);
            $table->integer('ind',5)->comment('index upload file');
            $table->timestamps();
            // $table->primary(['kdJudul','kdMember','ind']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('judul_file');
    }
}
