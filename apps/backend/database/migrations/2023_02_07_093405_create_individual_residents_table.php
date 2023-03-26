<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up()
    {
        Schema::create('individual_residents', function (Blueprint $table) {
            $table->id();
            $table->string('first_name_en');
            $table->string('last_name_en');
            $table->string('first_name_ka');
            $table->string('last_name_ka');
            $table->string('personal_number', 12)->unique();
        });
    }

    public function down()
    {
        Schema::dropIfExists('individual_residents');
    }
};
