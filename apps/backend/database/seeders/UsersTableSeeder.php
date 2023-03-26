<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $user = User::query()->find(1);

        if ($user) {
            return;
        }

        $user = new User([
            'email' => 'admin@fsg.post',
            'password' => Hash::make('ch4ngeme%'),
            'email_verified_at' => now(),
        ]);

        $user->id = 1;

        $user->saveQuietly();
    }
}
