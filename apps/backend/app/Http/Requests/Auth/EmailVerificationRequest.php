<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Http\FormRequest;

class EmailVerificationRequest extends FormRequest
{
    public function authorize(): bool
    {
        /** @var User|null $user */
        $user = User::find($this->route('id'));

        if (is_null($user)) {
            return false;
        }

        if (! hash_equals((string) $user->getKey(), (string) $this->route('id'))) {
            return false;
        }

        if (! hash_equals(sha1($user->getEmailForVerification()), (string) $this->route('hash'))) {
            return false;
        }

        $this->setUserResolver(fn () => $user);

        return true;
    }

    public function rules()
    {
        return [
            //
        ];
    }

    public function fulfill()
    {
        if (! $this->user()->hasVerifiedEmail()) {
            $this->user()->markEmailAsVerified();

            event(new Verified($this->user()));
        }
    }

    public function withValidator($validator)
    {
        return $validator;
    }
}
