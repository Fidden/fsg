<?php

namespace Database\Factories;

use App\Models\IndividualNonResident;
use App\Models\Recipient;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Recipient>
 */
class RecipientFactory extends Factory
{
    public function definition(): array
    {
        $model = IndividualNonResidentFactory::new()->create();

        return [
            'user_id' => User::factory(),
            'model_type' => IndividualNonResident::class,
            'model_id' => $model->id,
        ];
    }
}
