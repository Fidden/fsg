<?php

namespace App\Models;

use App\Support\HasAdvancedFilter;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use HasAdvancedFilter;
    use SoftDeletes;

    public $table = 'roles';

    protected $fillable = [
        'title',
    ];

    public array $orderable = [
        'id',
        'title',
    ];

    public array $filterable = [
        'id',
        'title',
        'permissions.title',
    ];

    protected function serializeDate(DateTimeInterface $date): string
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class);
    }
}
