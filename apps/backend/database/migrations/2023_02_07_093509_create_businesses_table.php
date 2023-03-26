<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up()
    {
        Schema::create('businesses', function (Blueprint $table) {
            $table->id();
            $table->string('uid', 36)->unique();
            $table->string('company_name_en', 255);
        });
    }

    public function down()
    {
        Schema::dropIfExists('businesses');
    }
};
