<?php

namespace App\Http\Controllers;

use App\Http\Resources\FlightResource;
use App\Models\Flight;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Cache;
use OpenApi\Annotations as OA;
use Spatie\QueryBuilder\QueryBuilder;

class FlightController extends Controller
{
    /**
     * @OA\Get(
     *     path="/flights",
     *     tags={"References"},
     *     summary="List of flights",
     *
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *     )
     * )
     */
    public function index(Request $request): ResourceCollection
    {
        return Cache::remember('flights-'.json_encode($request->query()), now()->addHour(), function () {
            $flights = QueryBuilder::for(Flight::class)
                ->defaultSort('-id')
                ->allowedSorts('id')
                ->allowedFilters('status')
                ->with('storage.country', 'branch.city.country')
                ->paginate();

            return FlightResource::collection($flights);
        });
    }
}
