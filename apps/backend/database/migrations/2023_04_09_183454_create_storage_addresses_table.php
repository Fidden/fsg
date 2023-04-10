<?php

use App\Models\City;
use App\Models\Storage;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('storage_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Storage::class);
            $table->foreignIdFor(City::class);
            $table->string('street');
            $table->string('zip');
            $table->timestamps();
        });
    }
};
