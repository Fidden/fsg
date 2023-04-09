<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class OrderPackage extends Pivot
{
    protected $table = 'order_package';

    public function order()
    {
        return $this->belongsTo(Order::class, 'id', 'order_id');
    }

    public function package()
    {
        return $this->belongsTo(OrderPackage::class, 'id', 'package_id');
    }
}
