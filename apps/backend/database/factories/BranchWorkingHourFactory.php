<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\BranchWorkingHour>
 */
class BranchWorkingHourFactory extends Factory
{
    public function definition(): array
    {
        return [
            'weekday' => $this->faker->randomElement(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
            'from' => $this->faker->time(),
            'to' => $this->faker->time(),
        ];
    }
}
