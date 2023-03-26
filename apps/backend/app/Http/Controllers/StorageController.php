<?php

namespace App\Http\Controllers;

use App\Http\Resources\StorageResource;
use App\Models\Storage;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Annotations as OA;
use Spatie\QueryBuilder\QueryBuilder;

class StorageController extends Controller
{
    /**
     * @OA\Get(
     *     path="/storages",
     *     tags={"References"},
     *     summary="List of storages",
     *
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *     )
     * )
     */
    public function index(): JsonResource
    {
        $storages = QueryBuilder::for(Storage::class)
            ->with('country')
            ->get();

        return StorageResource::collection($storages);
    }
}
