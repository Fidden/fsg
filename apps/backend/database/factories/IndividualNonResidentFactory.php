<?php

namespace Database\Factories;

use App\Models\IndividualNonResident;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<IndividualNonResident>
 */
class IndividualNonResidentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'first_name_en' => $this->faker->firstName,
            'last_name_en' => $this->faker->lastName,
            'document_number' => $this->faker->unique()->numerify('###########'),
        ];
    }
}
