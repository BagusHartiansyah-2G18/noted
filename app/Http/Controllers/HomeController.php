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
    public function index()
    {
        // $user =Auth::user();
        // $$request = new Request;
        // $request->session()->put('duser',$users);
        // $user =Auth::user()->id;
        // return print_r($user);
        return view('react')->with([
            "kdDinas" => Auth::user()->kdDinas
        ]);
    }
}
