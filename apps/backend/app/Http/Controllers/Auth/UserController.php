<?php

namespace App\Http\Controllers\Auth;

use App\Enums\VerifyCodeAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\CodeVerifyRequest;
use App\Http\Requests\UserChangePasswordRequest;
use App\Http\Requests\UserChangePhoneRequest;
use App\Http\Requests\UserRequestEmailChange;
use App\Notifications\EmailChangeNotification;
use App\Services\ResponseService;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        return response()->json(
            $request->user()->load('recipient')
        );
    }

    /**
     * Requests email change
     * @description Will send verification code to current email and after verification change email to new one.
     * @param UserRequestEmailChange $request
     * @return Application|ResponseFactory|Response
     */
    public function requestEmailChange(UserRequestEmailChange $request): Response|Application|ResponseFactory
    {
        $user = $request->user();
        $user->notify(new EmailChangeNotification($user, $request->email));

        return ResponseService::noContent();
    }

    public function changeEmail(CodeVerifyRequest $request)
    {
        $user = $request->user();
        if ($user->getVerifyCode(VerifyCodeAction::ChangeEmail) !== $request->code) {
            return ResponseService::error(
                __('Invalid_verify_code'),
                422
            );
        }

        // Remove used code.
        $code = $user->verifyCodes()
            ->where('code', $request->code)
            ->first();

        $user->email = json_decode($code->data)->email;
        $user->save();

        $code->delete();

        return ResponseService::noContent();
    }

    /**
     * @param UserChangePasswordRequest $request
     * @return Application|ResponseFactory|Response
     */
    public function changePassword(UserChangePasswordRequest $request): Response|Application|ResponseFactory
    {
        $user = auth()->user();
        if (!Hash::check($request->password, $user->password)) {
            return ResponseService::error(__('Password_doesnt_match'), 400);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return ResponseService::noContent();
    }

    /**
     * @param UserChangePhoneRequest $request
     * @return Response|Application|ResponseFactory
     */
    public function changePhone(UserChangePhoneRequest $request): Response|Application|ResponseFactory
    {
        $user = auth()->user();
        $user->phone = $request->password;
        $user->save();

        return ResponseService::noContent();
    }
}
