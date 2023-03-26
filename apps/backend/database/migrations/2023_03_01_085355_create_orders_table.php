<?php

use App\Enums\OrderStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->index();
            $table->unsignedBigInteger('flight_id')->nullable();
            $table->enum('status', OrderStatus::values());
            $table->unsignedBigInteger('branch_id');
            $table->unsignedDouble('amount_total')->default(0);
            $table->unsignedDouble('amount_paid')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')
                ->references('id')
                ->on('users');

            $table->foreign('flight_id')
                ->references('id')
                ->on('flights');

            $table->foreign('branch_id')
                ->references('id')
                ->on('branches');
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
