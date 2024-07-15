<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\value_forms;
use App\Models\User;
use App\Helper\Mfc;

class restApi extends Controller
{
    function index(){
        return print_r(base64_encode(json_encode([
            "kdDF"=>"582e56147822a6bd051d6be8022e19c7",
            "kdMember"=>"Mw==",
            "updated_at"=>"2023-11-07 05:17:06"
        ])));
        return print_r("selemat datang !!!"); 
    }
    function show($v){
        $v = Mfc::apiPortal($v);
        if($v['exc']){
            echo "<pre>";
            return print_r($v);
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
