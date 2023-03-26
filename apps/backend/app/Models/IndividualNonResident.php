<?php

namespace App\Models;

use App\Models\Interfaces\RecipientInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * @property int $id
 * @property string $first_name_en
 * @property string $last_name_en
 * @property string $document_number
 * @property Collection<Recipient>|Recipient[] $recipients
 */
class IndividualNonResident extends Model implements RecipientInterface
{
    use HasFactory;

    protected $fillable = [
        'first_name_en',
        'last_name_en',
        'document_number',
    ];

    public $timestamps = false;

    public function recipients(): MorphMany
    {
        return $this->morphMany(Recipient::class, 'model');
    }

    public static function uniqueFields(): array
    {
        return ['first_name_en', 'last_name_en', 'document_number'];
    }
}
