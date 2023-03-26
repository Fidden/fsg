<?php

namespace App\Enums;

use App\Traits\EnumToArray;

enum FlightStatus: string
{
    use EnumToArray;

    case Scheduled = 'scheduled';
    case Active = 'active';
    case Arrived = 'arrived';
    case Canceled = 'canceled';
    case Aborted = 'aborted';
}
