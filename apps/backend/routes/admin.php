<?php

use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/login', [AuthenticatedSessionController::class, 'showLoginForm'])
    ->middleware('guest')
    ->withoutMiddleware('auth')
    ->name('login');

// Permissions
Route::resource('permissions', PermissionController::class, ['except' => ['store', 'update', 'destroy']]);

// Roles
Route::resource('roles', RoleController::class, ['except' => ['store', 'update', 'destroy']]);

// Users
Route::resource('users', UserController::class, ['except' => ['store', 'update', 'destroy']]);
