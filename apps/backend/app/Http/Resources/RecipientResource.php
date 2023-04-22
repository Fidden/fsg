<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecipientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'uid' => $this->uid,
            'company_name_en' => $this->company_name_en,
            'branch' => BranchResource::make($this->branch),
            'first_name' => $this->first_name,
        ];
    }
}
