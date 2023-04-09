<?php

namespace Database\Factories;

use App\Enums\FlightStatus;
use App\Models\Branch;
use App\Models\Flight;
use App\Models\Storage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Flight>
 */
class FlightFactory extends Factory
{
    public function definition(): array
    {
        return [
            'departured_at' => fake()->dateTime(),
            'arrived_at' => fake()->dateTime(),
            'status' => FlightStatus::Arrived,
        ];
    }
}
