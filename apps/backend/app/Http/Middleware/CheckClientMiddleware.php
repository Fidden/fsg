<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;

class CheckClientMiddleware
{
    /**
     * @throws AuthorizationException
     */
    public function handle(Request $request, Closure $next)
    {
        /** @var User $user */
        $user = $request->user();

        if (is_null($user) || $user->is_client === false) {
            throw new AuthorizationException('You must be a client');
        }

        return $next($request);
    }
}
