<?php

declare(strict_types=1);

namespace App\Services;

use App\DataObjects\PhoneVerificationData;
use App\Jobs\SendSMSJob;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class PhoneVerificationService
{
    public const CODE_LENGTH = 4;

    public const CODE_VALID_MINUTES = 15;

    public const SEND_DELAY_SECONDS = 120;

    /**
     * @param  string  $phone Format E.164
     */
    public function sendCode(string $phone, bool $force = false): PhoneVerificationData
    {
        $data = $this->getData($phone);

        if ($force === false && ($this->isRecentlySent($data) || $this->expireSoon($data))) {
            return $data;
        }

        if (is_null($data)) {
            $data = PhoneVerificationData::from([
                'code' => $this->generateCode(),
                'sent_at' => now(),
                'expire_at' => now()->addMinutes(self::CODE_VALID_MINUTES)->addSeconds(3),
            ]);
        } else {
            $data->sent_at = now();
        }

        $this->setData($phone, $data);

        SendSMSJob::dispatch($phone, $this->makeText($data));

        return $data;
    }

    public function confirmCode(User $user, string $phone, int $code): void
    {
        if ($user->phone_verified_at) {
            throw ValidationException::withMessages([
                'phone' => trans('users.phone_already_verified'),
            ]);
        }

        $data = $this->getData($phone);

        if (is_null($data)) {
            throw ValidationException::withMessages([
                'code' => trans('users.phone_code_expired'),
            ]);
        }

        if ($code !== $data->code) {
            $this->handleFail($phone);
        }

        $this->removeData($phone);

        $user->update([
            'phone' => $phone,
            'phone_verified_at' => now(),
        ]);
    }

    protected function handleFail(string $phone): void
    {
        RateLimiter::hit($this->throttleKey($phone));

        throw ValidationException::withMessages([
            'code' => trans('users.phone_code_invalid'),
        ]);
    }

    public static function generateCode(): int
    {
        $result = '';

        for ($i = 0; $i < static::CODE_LENGTH; $i++) {
            $result .= mt_rand($i === 0 ? 1 : 0, 9);
        }

        return (int) $result;
    }

    protected function isRecentlySent(?PhoneVerificationData $data): bool
    {
        if (is_null($data?->sent_at)) {
            return false;
        }

        return $data->sent_at->diffInSeconds() < static::SEND_DELAY_SECONDS;
    }

    protected function expireSoon(?PhoneVerificationData $data): bool
    {
        if (is_null($data?->expire_at)) {
            return false;
        }

        return $data->expire_at->diffInSeconds() < 30;
    }

    protected function makeText(PhoneVerificationData $data): string
    {
        return trans('phone.code', ['code' => (string) $data->code, 'valid' => $data->expire_at->diffInMinutes()]);
    }

    protected function getData(string $phone): ?PhoneVerificationData
    {
        return Cache::get('phone_verification_code_'.$phone);
    }

    protected function setData(string $phone, PhoneVerificationData $data): void
    {
        Cache::put('phone_verification_code_'.$phone, $data, $data->expire_at);
    }

    protected function removeData(string $phone): void
    {
        Cache::forget('phone_verification_code_'.$phone);
    }

    public static function throttleKey(string $phone): string
    {
        return 'phone_verification_code_'.$phone.'_fails';
    }
}
