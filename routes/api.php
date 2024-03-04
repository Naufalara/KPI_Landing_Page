<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\AccountController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;

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
Route::get('/showonlp', [NewsController::class, 'showonlp']);
Route::get('/news/{id}', [NewsController::class, 'news']);

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('user', AuthController::class);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/admin', [DashboardController::class, 'index']);
    Route::get('/news-admin', [NewsController::class, 'index']);
    Route::get('/edit/{id}', [NewsController::class, 'showEditForm']);
    Route::get('/getkategori', [NewsController::class, 'getKategori']);
    Route::get('/getuploader', [NewsController::class, 'getUploader']);
    Route::post('/upload', [NewsController::class, 'upload']);
    Route::post('/update/{id}', [NewsController::class, 'update']);
    Route::post('/delete/{id}', [NewsController::class, 'delete']);
    Route::post('/changeVisibilitas/{id}', [NewsController::class, 'changeVisibilitas']);
    Route::get('/search/{searchdata}', [NewsController::class, 'search']);


    //Account
    Route::get('/account-admin', [AccountController::class, 'index']);
    Route::get('/edit-account/{id}', [AccountController::class, 'showEditForm']);
    Route::get('/getrole', [AccountController::class, 'getRole']);
    Route::post('/update-account/{id}', [AccountController::class, 'update']);
    Route::post('/delete-account/{id}', [AccountController::class, 'delete']);
    Route::get('/search-account/{searchdata}', [AccountController::class, 'search']);


    //Role
    Route::get('/role-admin', [RoleController::class, 'index']);
    Route::get('/create-role', [RoleController::class, 'create']);
    Route::get('/edit-role/{id}', [RoleController::class, 'edit']);
    Route::post('/update-role/{id}', [RoleController::class, 'update']);
    Route::post('/store-role', [RoleController::class, 'store']);
    Route::post('/destroy-role/{id}', [RoleController::class, 'destroy']);
    Route::get('/show-role/{id}', [RoleController::class, 'show']);
    Route::get('/permission', [RoleController::class, 'getPermission']);
    Route::get('/user-login-permission', [RoleController::class, 'getUserLoginPermission']);
});
