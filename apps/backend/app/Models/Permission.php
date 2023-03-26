<?php

namespace App\Models;

use App\Support\HasAdvancedFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Permission extends Model
{
    use HasAdvancedFilter;
    use SoftDeletes;

    public $table = 'permissions';

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
    ];
}
