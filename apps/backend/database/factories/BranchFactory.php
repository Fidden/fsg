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
            'working_hours' => [
                'monday' => [
                    'from' => '09:00',
                    'to' => '18:00',
                ],
                'tuesday' => [
                    'from' => '09:00',
                    'to' => '18:00',
                ],
                'wednesday' => [
                    'from' => '09:00',
                    'to' => '18:00',
                ],
                'thursday' => [
                    'from' => '09:00',
                    'to' => '18:00',
                ],
                'friday' => [
                    'from' => '09:00',
                    'to' => '18:00',
                ],
                'saturday' => [
                    'from' => '09:00',
                    'to' => '18:00',
                ],
                'sunday' => [
                    'from' => '09:00',
                    'to' => '18:00',
                ],
            ],
            'address' => [
                'street' => fake()->streetAddress,
                'zip' => fake()->postcode,
                'comment' => fake()->text,
            ],
            'phone' => fake()->e164PhoneNumber,
        ];
    }
}
