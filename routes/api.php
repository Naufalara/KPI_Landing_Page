<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/login', [AuthController::class, 'login']);


Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/admin', [DashboardController::class, 'index']);
    Route::get('/news-admin', [NewsController::class, 'index']);
    Route::get('/edit/{id}', [NewsController::class, 'showEditForm']);
    Route::get('/getkategori', [NewsController::class, 'getKategori']);
    Route::get('/getuploader', [NewsController::class, 'getUploader']);
});

Route::middleware(['auth:sanctum', 'type.admin'])->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
});

Route::middleware(['auth:sanctum', 'type:user'])->group(function () {
});
