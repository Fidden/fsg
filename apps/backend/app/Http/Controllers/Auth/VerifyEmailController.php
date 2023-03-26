<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmailVerifyRequest;
use App\Notifications\EmailVerificationNotification;
use App\Services\ResponseService;
use Illuminate\Auth\Events\Verified;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerifyRequest $request): \Illuminate\Contracts\Foundation\Application|ResponseFactory|Application|Response
    {
        $user = $request->user();
        if ($user->hasVerifiedEmail()) {
            return ResponseService::error(
                __('Email_already_verified'),
                200
            );
        }

        if ($user->getVerifyCode() !== $request->code) {
            return ResponseService::error(
                __('Invalid_verify_code'),
                422
            );
        }

        // Remove used code.
        $user->verifyCodes()
            ->where('code', $request->code)
            ->delete();

        $user->markEmailAsVerified();
        event(new Verified($user));

        return ResponseService::success([
            'message' => __('Email_verified'),
        ]);
    }

    /**
     * Resend email verification code.
     * @param Request $request
     * @return Response
     */
    public function resend(Request $request): Response
    {
        $request->user()->notify(new EmailVerificationNotification($request->user()));
        return ResponseService::noContent();
    }
}
