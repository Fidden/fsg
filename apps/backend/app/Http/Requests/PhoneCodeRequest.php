<?php

namespace App\Http\Requests;

use App\Services\PhoneVerificationService;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

/**
 * @property int $code
 */
class PhoneCodeRequest extends PhoneRequest
{
    protected function getTypeCasts(): array
    {
        return [
            'code' => 'intval',
        ];
    }

    public function rules(): array
    {
        return array_merge_recursive(parent::rules(), [
            'code' => ['required', 'integer', 'digits:4'],
        ]);
    }

    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('users.phone_throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    public function throttleKey(): string
    {
        return PhoneVerificationService::throttleKey($this->phone);
    }
}
