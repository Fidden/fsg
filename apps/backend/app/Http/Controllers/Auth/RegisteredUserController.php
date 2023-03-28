<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\EmailVerificationNotification;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use OpenApi\Annotations as OA;

class RegisteredUserController extends Controller
{
    /**
     * @source https://laravel.com/docs/8.x/authentication#authentication-quickstart
     *
     * @OA\Post(
     *     path="/register",
     *     tags={"Auth", "Users"},
     *     summary="Register new user",
     *
     *     @OA\Parameter(
     *         in="query",
     *         name="email",
     *         required=true,
     *
     *         @OA\Schema(type="string"),
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *     )
     * )
     *
     * @OA\Get(
     *     path="/csrf-cookie",
     *     summary="Set CSFR cookie",
     *
     *     @OA\Response(
     *         response=204,
     *         description="OK",
     *     )
     * )
     */
    public function store(Request $request): Response
    {
        $request->validate([
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', Rules\Password::min(8)->letters()->numbers()],
        ]);

        /** @var User $user */
        $user = User::query()->create([
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        $user->notify(new EmailVerificationNotification($user));

        Auth::login($user);

        return response()->noContent();
    }
}
