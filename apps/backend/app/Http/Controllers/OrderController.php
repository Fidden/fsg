<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\IncomingPackage;
use App\Models\Order;
use App\Models\Shop;
use App\Models\Storage;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\DB;
use OpenApi\Attributes as OA;
use Spatie\QueryBuilder\QueryBuilder;

class OrderController extends Controller
{
    public function index(): ResourceCollection
    {
        $orders = QueryBuilder::for(Order::class)
            ->with('packages')
            ->get();

        return OrderResource::collection($orders);
    }

    #[OA\Post('orders', parameters: [
        new OA\QueryParameter(name: 'tracking_number', required: true, schema: new OA\Schema(type: 'string', maxLength: 255)),
        new OA\QueryParameter(name: 'shop_id', required: true, schema: new OA\Schema(type: 'number')),
        new OA\QueryParameter(name: 'storage_id', required: true, schema: new OA\Schema(type: 'number')),
        new OA\QueryParameter(name: 'branch_id', required: true, schema: new OA\Schema(type: 'number')),
        new OA\QueryParameter(name: 'weight', schema: new OA\Schema(type: 'number')),
        new OA\QueryParameter(name: 'size'),
        new OA\QueryParameter(name: 'worth_amount', schema: new OA\Schema(type: 'number')),
        new OA\QueryParameter(name: 'worth_currency', schema: new OA\Schema(type: 'string', maxLength: 3)),
    ], responses: [
        new OA\Response(response: 201, description: 'Created', content: [
            new OA\MediaType(mediaType: 'application/json', schema: new OA\Schema(ref: '#/components/schemas/OrderResource')),
        ]),
    ])]
    public function store(StoreOrderRequest $request)
    {
        $user = $request->user();

        /** @var Shop $shop */
        $shop = Shop::query()->firstOrCreate([
            'url' => $request->shop,
        ], [
            'name' => $request->shop,
        ]);

        /** @var Storage $defaultStorage */
        $defaultStorage = Storage::query()->first();

        $order = DB::transaction(function () use ($defaultStorage, $shop, $user, $request): Order {
            $package = IncomingPackage::query()->firstOrCreate(array_merge([
                'user_id' => $user->id,
                'shop_id' => $shop->id,
            ], array_merge($request->only(
                'name',
                'tracking_number',
                'weight',
                'size',
                'worth_amount',
                'worth_currency'
            ), [
                'storage_id' => $defaultStorage->id,
            ])));

            /** @var Order $order */
            $order = Order::query()->firstOrCreate([
                'user_id' => $user->id,
                'status' => OrderStatus::Pending,
                'branch_id' => $request->branch_id ?: $user->recipient->branch_id,
            ]);

            $order->packages()->attach($package);

            return $order;
        });

        return OrderResource::make($order);
    }
}
