<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JudulController;
use App\Http\Controllers\FormEntri;
use App\Http\Controllers\SfMfc;
use App\Http\Controllers\Canggota;
use App\Http\Controllers\Cpublikasi;

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

// Route::get('/', function () {
//     return view('react');
// });

Auth::routes();

Route::get('logout', function(){
    Auth::logout();
    Session::flush();
    return redirect('/login');
});
Route::get('storage/{filename}', function ($filename){
    $files ="app/public/pdf/fileUploadSubNote/".$filename;
    $path = storage_path($files);
    return response()->download($path, $filename, [], 'inline');
});
Route::get('fileEntri/{filename}', function ($filename){
    $files ="app/public/pdf/fileEntri/".$filename;
    $path = storage_path($files);
    return response()->download($path, $filename, [], 'inline');
});
// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::controller(HomeController::class)->name('home.')->prefix('/')->group(function(){
    // Route::get('/home','php')->name('php');
    Route::get('/',function(){
        return view('react',[
            "user"=>''
        ]);
    }); 
    
    // Route::get('/cko/{path?}',function(){ 
    //     return view('react');
    // })->where('path', '.*');
    Route::get('/{path?}','web')->name('web')->where('path', '.*');

    
    // Route::view('/{path?}', 'react')
    //     ->where('path', '.*');
    
    // Route::get('/{path?}', function(){
    //     // return print_r("Bagus H");
    //     try {
    //         Auth::user()->get();
    //     } catch (\Throwable $th) {
    //         return redirect('/')->with(Auth::logout());
    //     }
    //     $q = Auth::user()->get(); 
        // return view('react',[
        //     "name"=>$q[0]->name
        // ]);
    // } )->where('path', '.*'); 
    // return print_r(Auth::user());  
});

Route::controller(JudulController::class)->name('judul.')->prefix('api/judul')->group(function(){
    Route::post('/','index')->name('index');
    Route::post('add','add')->name('add');
    Route::post('upd','upd')->name('upd');
    Route::post('del','del')->name('del');
    Route::post('sub','sub')->name('sub');

    Route::post('subFileUpload','subFileUpload')->name('subFileUpload');
    Route::post('actUFSubNote','actUFSubNote')->name('actUFSubNote');
    
});
Route::controller(FormEntri::class)->name('formEntri.')->prefix('api/formEntri')->group(function(){
    Route::post('getForm','getForm')->name('getForm');  
    Route::post('setForm','setForm')->name('setForm');
    Route::post('updForm','updForm')->name('updForm');
    
    Route::post('setTypeForm','setTypeForm')->name('setTypeForm');
    Route::post('delTypeFormSelected','delTypeFormSelected')->name('delTypeFormSelected');
    
    // batas 
    Route::post('getFormWithKey','getFormWithKey')->name('getFormWithKey');   
    Route::post('setValueForm','setValueForm')->name('setValueForm');
    Route::post('updValueForm','updValueForm')->name('updValueForm');
    Route::post('delValueForm','delValueForm')->name('delValueForm');
    

});
Route::controller(SfMfc::class)->name('sfmfc.')->prefix('api/sfmfc')->group(function(){ 
    Route::post('uploadFile','uploadFile')->name('uploadFile');  
}); 
Route::controller(Canggota::class)->name('anggota.')->prefix('api/anggota')->group(function(){ 
    Route::post('userSetter','userSetter')->name('userSetter');  
    Route::post('userGetter','userGetter')->name('userGetter');  
    Route::post('userUndang','userUndang')->name('userUndang');  
    Route::post('batalkanAnggota','batalkanAnggota')->name('batalkanAnggota');  
    Route::post('terimaAnggota','terimaAnggota')->name('terimaAnggota');   
}); 
Route::controller(Cpublikasi::class)->name('publikasi.')->prefix('api/publikasi')->group(function(){ 
    Route::post('updJenisSharing','updJenisSharing')->name('updJenisSharing');  
    Route::post('updPublikasi','updPublikasi')->name('updPublikasi');  
    Route::post('setAnggota','setAnggota')->name('setAnggota');  

    
}); 