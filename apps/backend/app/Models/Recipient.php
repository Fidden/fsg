<?php

namespace App\Models;

use App\Enums\RecipientType;
use App\Models\Interfaces\RecipientInterface;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property int $user_id
 * @property class-string $model_type
 * @property int $model_id
 * @property int $city_id
 * @property int $branch_id
 * @property array|string|null $address
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property User $user
 * @property City $city
 * @property Branch $branch
 * @property RecipientInterface $model
 */
class Recipient extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'model_type',
        'model_id',
        'city_id',
        'branch_id',
        'address',
    ];

    protected $casts = [
        'address' => 'json',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public static function types(): array
    {
        return array_map(fn ($name) => Str::snake($name), RecipientType::names());
    }

    public function model(): MorphTo
    {
        return $this->morphTo();
    }

    public function toArray(): array
    {
        return array_merge($this->model->toArray(), [
            'type' => Str::snake(RecipientType::tryFrom($this->model_type)->name),
        ]);
    }
}
