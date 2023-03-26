<?php

namespace App\Http\Controllers;

use App\Http\Resources\BranchResource;
use App\Models\Branch;
use Illuminate\Http\Resources\Json\ResourceCollection;
use OpenApi\Annotations as OA;
use Spatie\QueryBuilder\QueryBuilder;

class BranchController extends Controller
{
    /**
     * @OA\Get(
     *     path="/branches",
     *     tags={"References"},
     *     summary="List of branches",
     *
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *     )
     * )
     */
    public function index(): ResourceCollection
    {
        $branches = QueryBuilder::for(Branch::class)
            ->with('city.country')
            ->get();

        return BranchResource::collection($branches);
    }
}
