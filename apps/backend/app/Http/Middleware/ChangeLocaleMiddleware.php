<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ChangeLocaleMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if ($requestedLocale = $request->hasHeader('Content-Language')) {
            $supportedLocales = ['en', 'ka', 'ru'];

            if (in_array($requestedLocale, $supportedLocales)) {
                app()->setLocale($requestedLocale);
            }
        }

        return $next($request);
    }
}
