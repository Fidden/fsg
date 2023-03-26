<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Storage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Storage>
 */
class StorageFactory extends Factory
{
    public function definition(): array
    {
        /** @var Country $country */
        $country = Country::query()->inRandomOrder()->first();

        return [
            'country_id' => $country->id,
            'address' => [
                'city' => fake()->city,
                'street' => fake()->streetAddress,
                'zip' => fake()->postcode,
            ],
        ];
    }
}
