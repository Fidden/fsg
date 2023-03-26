<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up()
    {
        Schema::create('incoming_packages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->string('name')->nullable();
            $table->string('tracking_number')->index();
            $table->unsignedBigInteger('shop_id');
            $table->unsignedBigInteger('storage_id');
            $table->unsignedDouble('weight')->nullable();
            $table->jsonb('size')->nullable();
            $table->unsignedDouble('worth_amount')->nullable();
            $table->string('worth_currency', 3)->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')
                ->references('id')
                ->on('users');

            $table->foreign('shop_id')
                ->references('id')
                ->on('shops');

            $table->foreign('storage_id')
                ->references('id')
                ->on('storages');
        });
    }

    public function down()
    {
        Schema::dropIfExists('incoming_packages');
    }
};
