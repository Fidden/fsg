<?php

namespace App\DataObjects;

use Carbon\Carbon;
use Spatie\LaravelData\Data;

class PhoneVerificationData extends Data
{
    public function __construct(
        public int $code,
        public Carbon $sent_at,
        public Carbon $expire_at,
    ) {
    }
}
