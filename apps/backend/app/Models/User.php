<?php

namespace App\Models;

use App\Enums\VerifyCodeAction;
use App\Support\HasAdvancedFilter;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property int $id
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string|null $phone
 * @property Carbon|null $phone_verified_at
 * @property string|null $password
 * @property float $balance
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string|null $remember_token
 * @property Recipient|null $recipient
 * @property bool $is_client
 * @property bool $is_admin
 */
class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use HasAdvancedFilter;
    use \Illuminate\Auth\MustVerifyEmail;

    protected $fillable = [
        'email',
        'email_verified_at',
        'phone',
        'phone_verified_at',
        'balance',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'phone_verified_at' => 'datetime',
    ];

    public array $orderable = [
        'id',
        'name',
        'email',
        'email_verified_at',
    ];

    public array $filterable = [
        'id',
        'name',
        'email',
        'email_verified_at',
        'roles.title',
    ];

    public function recipient(): HasOne
    {
        return $this->hasOne(Recipient::class);
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    public function getIsAdminAttribute(): bool
    {
        return $this->roles()->where('title', 'Admin')->exists();
    }

    public function scopeAdmins()
    {
        return $this->whereHas('roles', fn($q) => $q->where('title', 'Admin'));
    }

    public function setPasswordAttribute($input)
    {
        if ($input) {
            $this->attributes['password'] = Hash::needsRehash($input) ? Hash::make($input) : $input;
        }
    }

    public function getIsClientAttribute(): bool
    {
        if (is_null($this->recipient)) {
            return false;
        }

        if (is_null($this->email_verified_at)) {
            return false;
        }

        return true;
    }

    public function verifyCodes(): HasMany
    {
        return $this->hasMany(UserVerifyCode::class, 'user_id', 'id');
    }

    public function createVerifyCode(VerifyCodeAction $action, array $data = null)
    {
        $number = rand(0, 9999);
        $number = str_pad($number, 4, '0', STR_PAD_LEFT);

        $this->verifyCodes()->create([
            'code' => $number,
            'action' => $action->value,
            'data' => json_encode($data),
            'expires_at' => Carbon::now()->addMinutes(10),
        ]);
    }

    public function getVerifyCode(VerifyCodeAction $action)
    {
        return $this->verifyCodes()
            ->where('action', $action->value)
            ->latest()
            ->value('code');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
