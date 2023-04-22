<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostOutcomeRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'incoming_package_id' => 'required|string'
        ];
    }
}
