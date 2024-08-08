<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */ 
    public function web()
    { 
        // Auth::user()
        return view('react',[
            "user"=>  base64_encode(json_encode([
                "name"=> Auth::user()->name,
                "email"=> Auth::user()->email,
            ]))
        ]);
        // return view('react')->with([
        //     "user" => base64_encode(json_encode(Auth::user()))
        // ]);
    }
    
}
