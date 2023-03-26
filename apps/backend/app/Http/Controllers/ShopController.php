<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreShopRequest;
use App\Models\Shop;
use Illuminate\Http\JsonResponse;
use OpenApi\Annotations as OA;
use Spatie\QueryBuilder\QueryBuilder;

class ShopController extends Controller
{
    /**
     * @OA\Get(
     *     path="/shops",
     *     tags={"References"},
     *     summary="List of shops",
     *
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        $shops = QueryBuilder::for(Shop::class)
            ->defaultSort('-id')
            ->allowedSorts('id')
            ->get(['id', 'name', 'url']);

        return response()->json($shops);
    }

    /**
     * @OA\Post(
     *     path="/shops",
     *     summary="Add a new shop",
     *
     *     @OA\Parameter(
     *         name="name",
     *         in="query",
     *         description="Shop name",
     *         required=true,
     *     ),
     *     @OA\Parameter(
     *         name="url",
     *         in="query",
     *         description="Shop url"
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *     )
     * )
     */
    public function store(StoreShopRequest $request): JsonResponse
    {
        /** @var Shop $shop */
        $shop = Shop::query()->firstOrCreate(
            $request->only('name'),
            $request->only('url')
        );

        return response()->json($shop);
    }
}
