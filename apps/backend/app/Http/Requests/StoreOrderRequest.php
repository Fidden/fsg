<?php

namespace App\Http\Requests;

/**
 * @property string|null $name
 * @property string $tracking_number
// * @property int $shop_id
 * @property string $shop
 * @property int|null $storage_id
 * @property float|null $weight
 * @property array|null $size
 * @property int|null $branch_id
 * @property float|null $worth_amount
 * @property string|null $worth_currency
 */
class StoreOrderRequest extends AbstractRequest
{
    public function rules(): array
    {
        return [
            'name' => ['nullable', 'string', 'max:255'],
            'tracking_number' => ['required', 'string', 'max:255', 'unique:incoming_packages'],
            // 'shop_id' => ['required', 'integer', 'exists:shops,id'],
            'shop' => ['required', 'string', 'max:255'],
            'storage_id' => ['nullable', 'integer', 'exists:storages,id'],
            'weight' => ['nullable', 'numeric'],
            'size' => ['nullable', 'array'],
            'branch_id' => ['nullable', 'integer', 'exists:branches,id'],
            'worth_amount' => ['nullable', 'numeric'],
            'worth_currency' => ['nullable', 'string', 'max:3'],
        ];
    }
}
