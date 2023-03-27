<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $email
 */
class UserRequestEmailChange extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => 'required|email'
        ];
    }
}
