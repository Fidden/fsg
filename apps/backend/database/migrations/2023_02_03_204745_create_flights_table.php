<?php

use App\Enums\FlightStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up()
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('from_storage_id');
            $table->unsignedBigInteger('to_branch_id');
            $table->date('departured_at');
            $table->date('arrived_at');
            $table->enum('status', FlightStatus::values());
            $table->timestamps();

            $table->foreign('from_storage_id')
                ->references('id')
                ->on('storages');

            $table->foreign('to_branch_id')
                ->references('id')
                ->on('branches');
        });
    }

    public function down()
    {
        Schema::dropIfExists('flights');
    }
};
