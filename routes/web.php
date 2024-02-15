<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JudulController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('react');
});

Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::controller(HomeController::class)->name('home.')->prefix('home')->group(function(){
    Route::get('/','index')->name('index');
    Route::view('/{path?}', 'react')
        ->where('path', '.*');
});

Route::controller(JudulController::class)->name('judul.')->prefix('api/judul')->group(function(){
    Route::post('/','index')->name('index');
    Route::post('add','add')->name('add');
    Route::post('upd','upd')->name('upd');
    Route::post('sub','sub')->name('sub');
});