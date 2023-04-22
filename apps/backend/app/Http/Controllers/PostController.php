<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Http\Requests\PostIncomeRequest;
use App\Http\Requests\PostOutcomeRequest;
use App\Models\IncomingPackage;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;

class PostController extends Controller
{
    public function outcome(PostOutcomeRequest $request): RedirectResponse
    {
        /** @var IncomingPackage $incomingPackage */
        $incomingPackage =
            IncomingPackage::query()->find($request->incoming_package_id);

        if (!$incomingPackage) {
            return redirect()->back()->withErrors([
                'package' => 'Package not found'
            ]);
        }

        /** @var Order $order */
        $order = $incomingPackage->orders()->first();
        if (!$order) {
            return redirect()->back()->withErrors([
                'package' => 'Order not found'
            ]);
        }

        $order->status = OrderStatus::Processing;
        $order->save();

        return redirect()->back()->with([
            'message' => 'Success.'
        ]);
    }

    public function income(PostIncomeRequest $request): RedirectResponse
    {
        /** @var IncomingPackage $incomingPackage */
        $incomingPackage =
            IncomingPackage::query()->find($request->incoming_package_id);

        if (!$incomingPackage) {
            return redirect()->route('moonshine.incomingPackages.store');
        }

        return redirect()->route('moonshine.incomingPackages.index');
    }
}
