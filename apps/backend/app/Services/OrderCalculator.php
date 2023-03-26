<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Order;

class OrderCalculator
{
    public const DELIMETER = 6000;

    public const DELIVERY_PRICE = 4; // 4 euro per 1 kg

    public function getDimensionalWeight(Order $order): float
    {
        return round($order->volume / static::DELIMETER, 2);
    }

    public function getWeight(Order $order): float
    {
        $dimensionalWeight = $this->getDimensionalWeight($order);

        return max($order->weight, $dimensionalWeight);
    }

    public function getDeliveryPrice(Order $order): float
    {
        return $this->getWeight($order) * static::DELIVERY_PRICE;
    }
}
