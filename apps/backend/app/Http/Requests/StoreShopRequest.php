<?php

namespace App\Http\Requests;

use App\Models\Shop;
use Illuminate\Foundation\Http\FormRequest;

class StoreShopRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:'.Shop::class, 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'],
            'url' => ['nullable', 'string', 'max:255', 'url'],
        ];
    }
}
