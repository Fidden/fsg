<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up()
    {
        Schema::create('recipients', function (Blueprint $table) {
            $table->id()->startingValue(1000);
            $table->unsignedBigInteger('user_id')->unique();
            $table->morphs('model');
            $table->unsignedBigInteger('city_id');
            $table->unsignedBigInteger('branch_id');
            $table->jsonb('address')->nullable();
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('city_id')
                ->references('id')
                ->on('cities');

            $table->foreign('branch_id')
                ->references('id')
                ->on('branches');
        });
    }

    public function down()
    {
        Schema::dropIfExists('recipients');
    }
};
