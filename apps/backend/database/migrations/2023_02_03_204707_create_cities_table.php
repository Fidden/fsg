<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up()
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->unsignedBigInteger('country_id')->index();

            $table->foreign('country_id')
                ->references('id')
                ->on('countries');
        });
    }

    public function down()
    {
        Schema::dropIfExists('cities');
    }
};
