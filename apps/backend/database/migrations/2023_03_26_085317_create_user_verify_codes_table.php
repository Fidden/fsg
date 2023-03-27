<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('user_verify_codes', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)
                ->constrained()
                ->cascadeOnDelete();

            $table->string('code', 4);
            $table->enum('action', ['change_email', 'change_password', 'register']);
            $table->json('data')->nullable()->default(null);
            $table->dateTime('expires_at');
            $table->timestamps();
        });
    }
};
