<?php

namespace App\Enums;

use App\Models\Business;
use App\Models\IndividualNonResident;
use App\Models\IndividualResident;
use App\Traits\EnumToArray;

enum RecipientType: string
{
    use EnumToArray;

    case Business = Business::class;
    case IndividualResident = IndividualResident::class;
    case IndividualNonResident = IndividualNonResident::class;
}
