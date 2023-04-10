<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\BranchAddress>
 */
class BranchAddressFactory extends Factory
{
    public function definition(): array
    {
        return [
            'street' => $this->faker->streetAddress,
            'zip' => $this->faker->postcode,
            'comment' => $this->faker->sentence,
        ];
    }
}
