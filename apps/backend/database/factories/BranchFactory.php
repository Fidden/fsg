<?php

namespace Database\Factories;

use App\Models\Branch;
use App\Models\City;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Branch>
 */
class BranchFactory extends Factory
{
    public function definition(): array
    {
        /** @var City $city */
        $city = City::factory()->create();

        return [
            'city_id' => $city->id,
            'phone' => fake()->e164PhoneNumber,
        ];
    }
}
