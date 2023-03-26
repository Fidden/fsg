<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up()
    {
        Schema::create('individual_non_residents', function (Blueprint $table) {
            $table->id();
            $table->string('first_name_en');
            $table->string('last_name_en');
            $table->string('document_number', 16);

            $table->unique(['first_name_en', 'last_name_en', 'document_number'], 'unique_individual_non_residents');
        });
    }

    public function down()
    {
        Schema::dropIfExists('individual_non_residents');
    }
};
