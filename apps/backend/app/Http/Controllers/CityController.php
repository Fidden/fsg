<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

class CityController extends Controller
{
    /**
     * @OA\Get(
     *     path="/cities",
     *     tags={"References"},
     *     summary="List of cities",
     *
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $cities = Country::query()
            ->whereHas('cities')
            ->with('cities')
            ->get();

        return response()->json($cities->toArray());
    }
}
