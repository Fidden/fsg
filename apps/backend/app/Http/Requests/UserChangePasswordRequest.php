<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class UserChangePasswordRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'password' => ['required', Rules\Password::min(8)->letters()->numbers()],
            'new_password' => ['required', Rules\Password::min(8)->letters()->numbers()],
            'new_password_confirm' => ['required', Rules\Password::min(8)->letters()->numbers(), 'same:new_password'],
        ];
    }
}
