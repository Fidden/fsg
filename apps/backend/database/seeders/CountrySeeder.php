<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    public function run()
    {
        if (Country::query()->count() > 0) {
            $this->command->warn('The countries table is not empty, therefore it will not be seeded!');

            return;
        }

        $json = app('countryList')->getList('en', 'json');
        $data = json_decode($json, true);

        $countries = array_map(function (string $code, string $name) {
            return compact('code', 'name');
        }, array_keys($data), array_values($data));

        Country::query()->insert($countries);

        $this->command->info('The countries table has been seeded!');
    }
}
