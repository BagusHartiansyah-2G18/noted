<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\value_forms;
use App\Models\User;
use App\Helper\Mfc;

class apiValueData extends Controller
{
    private $Mfc; 
    public function __construct()
    { 
        $this->Mfc = new Mfc();
        // $this->middleware('auth');
    }
    function index(){ 
        return print_r("selemat datang !!!"); 
    }
    function show($v){
        $v = $this->Mfc->apiPortal($v);
        if($v['exc']){
            $dparam = $v['dparam'];
            $dv = value_forms::
                select(["data"])
                ->where([
                    "kdDF"=>$dparam->kdDF,
                    'aktif'=>1
                ])->get();
            return $this->Mfc->resp($dv);
        } 
        return print_r($v);
    }
    function update(){
        return print_r("Bagus 2");
    }
    function destroy(){
        return print_r("Bagus 3");
    }
    function main(){
        return print_r("main");
    }
    
}
