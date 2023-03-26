<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class OrderPackage extends Pivot
{
    protected $table = 'order_package';
}
