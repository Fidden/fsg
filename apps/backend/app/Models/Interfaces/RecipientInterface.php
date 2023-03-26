<?php

namespace App\Models\Interfaces;

use App\Models\Recipient;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * @property int $id
 * @property Collection<Recipient>|Recipient[] $recipients
 */
interface RecipientInterface
{
    public function recipients(): MorphMany;

    /**
     * @return string[]
     */
    public static function uniqueFields(): array;
}
