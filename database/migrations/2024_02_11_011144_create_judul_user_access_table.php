<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJudulUserAccessTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('judul_user_access', function (Blueprint $table) {
            $table->string('kdJudul',150);
            $table->string('kdMember',25);
            $table->string('kdMemberSub',25)->comment('member ajakan');
            $table->timestamps();
            // $table->primary(['kdJudul','kdMember','kdMemberSub']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('judul_user_access');
    }
}
