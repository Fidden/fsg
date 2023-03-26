<?php

namespace App\Models;

use App\Models\Interfaces\RecipientInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * @property int $id
 * @property string $uid
 * @property string $company_name_en
 * @property Collection<Recipient>|Recipient[] $recipients
 */
class Business extends Model implements RecipientInterface
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'uid',
        'company_name_en',
    ];

    public function recipients(): MorphMany
    {
        return $this->morphMany(Recipient::class, 'model');
    }

    public static function uniqueFields(): array
    {
        return ['uid'];
    }
}
