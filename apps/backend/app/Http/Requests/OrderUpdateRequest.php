<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'worth_amount' => ['nullable', 'numeric'],
            'worth_currency' => ['nullable', 'string', 'max:3'],
            'name' => ['nullable', 'string', 'max:255'],
            'tracking_number' => ['string', 'max:255'],
            'package_id' => ['required', 'exists:incoming_packages,id'],
            'order_id' => ['required', 'exists:orders,id'],
            'invoice' => ['file', 'mimes:jpeg,bmp,png,pdf,jpg']
        ];
    }
}
