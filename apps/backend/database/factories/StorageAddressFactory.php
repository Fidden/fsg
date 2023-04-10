<?php

namespace Database\Factories;

use App\Models\City;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\StorageAddress>
 */
class StorageAddressFactory extends Factory
{
    public function definition(): array
    {
        return [
            'street' => $this->faker->streetAddress,
            'zip' => $this->faker->postcode,
        ];
    }
}
