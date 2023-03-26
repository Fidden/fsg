<?php

namespace App\Http\Resources;

use App\Models\Order;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

/**
 * @mixin Order
 */
#[OA\Schema(properties: [
    new OA\Property(property: 'id', type: 'number'),
    new OA\Property(property: 'status', type: 'string', enum: ['pending', 'processing', 'shipped', 'arrived', 'completed']),
    new OA\Property(property: 'amount_total', type: 'number'),
    new OA\Property(property: 'amount_paid', type: 'number'),
    new OA\Property(property: 'branch', ref: '#/components/schemas/BranchResource'),
    new OA\Property(property: 'flight', ref: '#/components/schemas/FlightResource', nullable: true),
    new OA\Property(property: 'package', ref: '#/components/schemas/IncomingPackageResource'),
    new OA\Property(property: 'created_at', type: 'string', format: 'date-time'),
    new OA\Property(property: 'updated_at', type: 'string', format: 'date-time'),
    new OA\Property(property: 'deleted_at', type: 'string', format: 'date-time', nullable: true),
])]
class OrderResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'amount_total' => (float) $this->amount_total,
            'amount_paid' => (float) $this->amount_paid,
            'branch' => BranchResource::make($this->branch),
            'flight' => $this->flight ? FlightResource::make($this->flight) : null,
            'package' => IncomingPackageResource::make($this->packages->first()),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
