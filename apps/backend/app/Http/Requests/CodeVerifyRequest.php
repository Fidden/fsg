<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $code
 */
class CodeVerifyRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'code' => 'required|string|min:4|max:4',
        ];
    }
}
