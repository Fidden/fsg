<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Http\Requests\OrderUpdateRequest;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\IncomingPackage;
use App\Models\Order;
use App\Models\Shop;
use App\Models\Storage;
use App\Models\User;
use App\Services\ResponseService;
use Illuminate\Http\Resources\Json\ResourceCollection;
use OpenApi\Attributes as OA;
use Spatie\QueryBuilder\QueryBuilder;

class OrderController extends Controller
{
    public function index(): ResourceCollection
    {
        /** @var User $user */
        $user = auth()->user();
        $orders = $user->orders()->with('packages')->paginate();

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

        $package = IncomingPackage::query()->create([
            'user_id' => $user->id,
            'shop_id' => $shop->id,
            'storage_id' => $defaultStorage->id,
            ...$request->only([
                'name',
                'tracking_number',
                'weight',
                'size',
                'worth_amount',
                'worth_currency'
            ])
        ]);

        /** @var Order $order */
        $order = Order::query()->create([
            'user_id' => $user->id,
            'status' => OrderStatus::Pending,
            'branch_id' => $request->branch_id ?: $user->recipient->branch_id,
        ]);

        if ($request->has('invoice')) {
            $invoicePath = "invoices/{$user->id}/{$order->id}";
            $link = \Illuminate\Support\Facades\Storage::disk('public')->put(
                $invoicePath,
                $request->file('invoice')
            );

            $order->invoice = $link;
            $order->save();
        }

        $order->packages()->attach($package);

        return OrderResource::make($order);
    }

    public function update(OrderUpdateRequest $request)
    {
        $user = $request->user();
        IncomingPackage::query()->find($request->package_id)->update(
            $request->only([
                'name',
                'tracking_number',
                'worth_amount',
                'worth_currency'
            ])
        );

        /** @var Order $order */
        $order = Order::query()->find($request->order_id);

        if ($request->has('invoice')) {
            $invoicePath = "invoices/{$user->id}/{$order->id}";
            $link = \Illuminate\Support\Facades\Storage::disk('public')->put(
                $invoicePath,
                $request->file('invoice')
            );

            $order->invoice = $link;
            $order->save();
        }

        return OrderResource::make($order);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return ResponseService::noContent();
    }
}
