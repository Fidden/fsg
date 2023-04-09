<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up()
    {
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('city_id')->index();
            $table->string('phone')->nullable();
            $table->timestamps();

            $table->foreign('city_id')
                ->references('id')
                ->on('cities');
        });
    }

    public function down()
    {
        Schema::dropIfExists('branches');
    }
};
