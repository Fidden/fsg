<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVerifyCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'action',
        'data',
        'expires_at',
    ];

    public function invalid()
    {
        return $this->where('expires_at', '<', now());
    }
}
