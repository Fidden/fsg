<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up()
    {
        Schema::create('order_package', function (Blueprint $table) {
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('package_id');
            $table->timestamps();
            $table->unsignedBigInteger('id')->default(1);
            $table->foreign('order_id')
                ->references('id')
                ->on('orders')
                ->onDelete('cascade');

            $table->foreign('package_id')
                ->references('id')
                ->on('incoming_packages')
                ->onDelete('cascade');

            $table->primary(['order_id', 'package_id'], 'order_package_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('order_package');
    }
};
