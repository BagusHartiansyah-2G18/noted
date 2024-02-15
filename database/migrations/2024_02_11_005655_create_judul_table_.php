<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateJudulTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('judul', function (Blueprint $table) {
            $table->string('kdJudul',150);
            $table->string('judul',150);
            $table->text('ringkasan');
            $table->boolean('publikasi')->default(0);
            $table->string('kdMember',25);
            $table->string('kdMemberSub',25)->default('');
            $table->string('tingkat',5)->default('0');
            $table->timestamps();
            $table->primary(['kdJudul','kdMember']);
            // DB::statement('ALTER TABLE spins MODIFY rid INTEGER NOT NULL AUTO_INCREMENT');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('judul_table_');
    }
}
