<?php

use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PhoneVerificationController;
use App\Http\Controllers\RecipientController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\StorageController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

Route::get('/', function () {
    return response()->json([
        'message' => 'Hello, World',
    ]);
});

Route::get('/csrf-cookie', [CsrfCookieController::class, 'show'])
    ->name('sanctum.csrf-cookie');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users/me', [UserController::class, 'show'])
        ->name('users.me');

    Route::post('/users/request-email-change', [UserController::class, 'requestEmailChange']);
    Route::post('/users/change-email', [UserController::class, 'changeEmail']);
    Route::post('/users/change-password', [UserController::class, 'changePassword']);
    Route::post('/users/change-phone', [UserController::class, 'changePhone']);
    Route::post('/users/change-branch', [UserController::class, 'changeBranch']);

    Route::get('/users/phone', [PhoneVerificationController::class, 'store'])
        ->name('users.phone.send-code');

    Route::post('/users/phone', [PhoneVerificationController::class, 'verify'])
        ->name('users.phone.confirm-code');

    Route::prefix('recipients')
        ->name('recipients.')
        ->group(function () {
            Route::post('/', [RecipientController::class, 'store'])
                ->name('store');
        });
});

require __DIR__ . '/auth.php';

Route::prefix('flights')
    ->name('flights.')
    ->group(function () {
        Route::get('/', [FlightController::class, 'index'])
            ->name('index');
    });

Route::prefix('storages')
    ->name('storages.')
    ->group(function () {
        Route::get('/', [StorageController::class, 'index'])
            ->name('index');
    });

Route::prefix('cities')
    ->name('cities.')
    ->group(function () {
        Route::get('/', [CityController::class, 'index'])
            ->name('index');
    });

Route::prefix('branches')
    ->name('branches.')
    ->group(function () {
        Route::get('/', [BranchController::class, 'index'])
            ->name('index');
    });

Route::prefix('shops')
    ->name('shops.')
    ->group(function () {
        Route::get('/', [ShopController::class, 'index'])
            ->name('index');

        Route::post('/', [ShopController::class, 'store'])
            ->middleware('auth:sanctum')
            ->name('store');
    });

Route::prefix('orders')
    ->name('orders.')
    ->middleware('client')
    ->group(function () {
        Route::get('/', [OrderController::class, 'index'])
            ->name('index');

        Route::post('/', [OrderController::class, 'store'])
            ->name('store');

        Route::delete('/{order}', [OrderController::class, 'destroy'])
            ->name('destroy');

        Route::post('/update', [OrderController::class, 'update'])
            ->name('update');
    });
