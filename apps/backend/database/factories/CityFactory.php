<?php

namespace Database\Factories;

use App\Models\City;
use App\Models\Country;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<City>
 */
class CityFactory extends Factory
{
    public function definition(): array
    {
        /** @var Country $country */
        $country = Country::query()->inRandomOrder()->first();

        return [
            'key' => $this->faker->city,
            'country_id' => $country->id,
        ];
    }
}
