<?php

namespace App\Http\Controllers;

use App\Exceptions\VerificationCodeException;
use App\Http\Requests\PhoneCodeRequest;
use App\Http\Requests\PhoneRequest;
use App\Services\PhoneVerificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use OpenApi\Annotations as OA;
use Propaganistas\LaravelPhone\PhoneNumber;

class PhoneVerificationController extends Controller
{
    /**
     * @OA\Post(
     *     path="/users/phone",
     *     tags={"Users"},
     *     summary="Verify phone number",
     *     description="Verify phone number",
     *     operationId="verifyPhone",
     *
     *     @OA\Parameter(
     *          name="phone",
     *          in="query",
     *          description="Phone number (any format, but e164 is recommended)",
     *          required=true,
     *     ),
     *
     *     @OA\Response(
     *          response=200,
     *          description="Code was sent",
     *
     *          @OA\JsonContent(
     *
     *              @OA\Property(
     *                  property="phone",
     *                  type="string",
     *                  example="+995555555555"
     *              ),
     *              @OA\Property(
     *                  property="sent_at",
     *                  type="string",
     *                  format="date-time",
     *                  example="2021-01-01T00:00:00+00:00"
     *              ),
     *              @OA\Property(
     *                  property="expire_at",
     *                  type="string",
     *                  format="date-time",
     *                  example="2021-01-01T00:00:00+00:00"
     *              ),
     *          ),
     *     ),
     *
     *      @OA\Response(
     *          response=422,
     *          description="Validation failed"
     *     )
     * )
     */
    public function store(PhoneRequest $request): JsonResponse
    {
        if ($request->user()->phone_verified_at) {
            return response()->json([
                'message' => 'Phone number is already verified',
            ], 400);
        }

        $phone = (string) new PhoneNumber($request->phone, 'GE');

        $data = app(PhoneVerificationService::class)
            ->sendCode($phone);

        $response = [
            'phone' => $phone,
            'sent_at' => $data->sent_at,
            'expire_at' => $data->expire_at,
        ];

        if (config('app.debug')) {
            $response['code'] = $data->code;
        }

        return response()->json($response);
    }

    /**
     * @throws VerificationCodeException
     */
    public function verify(PhoneCodeRequest $request)
    {
        $request->ensureIsNotRateLimited();

        $user = $request->user();
        if ($user->phone_verified_at) {
            throw ValidationException::withMessages([
                'phone' => trans('users.phone_already_verified'),
            ]);
        }

        $phone = (string) new PhoneNumber($request->phone, 'GE');

        app(PhoneVerificationService::class)
            ->confirmCode($user, $phone, $request->code);

        return response()->noContent();
    }
}
