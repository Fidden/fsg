<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\WorkerController;
use Illuminate\Support\Facades\Route;

Route::prefix('/worker')->group(function () {
    Route::view('/', 'worker.index')->name('worker.index');
    Route::get('/income', [WorkerController::class, 'income'])->name('worker.income');
    Route::get('/outcome', [WorkerController::class, 'outcome'])->name('worker.outcome');
});

Route::prefix('/post')->group(function () {
    Route::post('/outcome', [PostController::class, 'outcome'])->name('post.outcome');
    Route::post('/income', [PostController::class, 'income'])->name('post.income');
});
