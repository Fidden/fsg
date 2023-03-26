<?php

namespace App\Enums;

use App\Traits\EnumToArray;

enum OrderStatus: string
{
    use EnumToArray;

    case Pending = 'pending';
    case Processing = 'processing';
    case Shipped = 'shipped';
    case Arrived = 'arrived';
    case Completed = 'completed';
}
