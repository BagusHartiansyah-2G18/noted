<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('user', function (Request $request) {
//     return $request->user();
// });
// Route::apiResource('resp/',App\Http\Controllers\restApi::class)->name("/","index");
Route::apiResource('vd',App\Http\Controllers\apiValueData::class);

// Route::apiResource('respMain',App\Http\Controllers\restApi::class,['main']);

// Route::controller(App\Http\Controllers\restApi::class)->name("resp.")->group(function () {
//     Route::post('/','index')->name('index');
// });
// Route::get('rest/users', function () {
//     return print_r("Bagus H");
//     // return print_r(Auth::user());
//     // return new UserCollection(User::all());
//     // return UserResource::collection(User::all()); 
// });
