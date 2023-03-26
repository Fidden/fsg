<?php

namespace App\Http\Requests;

/**
 * @property string $phone
 */
class PhoneRequest extends AbstractRequest
{
    public function rules(): array
    {
        return [
            'phone' => ['required', 'phone:GE'],
        ];
    }
}
