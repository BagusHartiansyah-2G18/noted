<?php

namespace App\Http\Controllers;
use App\Helper\Mfc; 
use Illuminate\Http\Request;  
use App\Models\anggota; 
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class Canggota extends Controller
{
    private $Mfc; 
    public function __construct()
    { 
        $this->Mfc = new Mfc(); 
        $this->middleware('auth');
    }
    function userSetter(Request $request){
        $v = $this->Mfc->portal();
        if($v['exc']){    
            $validator = $request;
            try {
                $validator = $validator->validate([ 
                    'name' => 'required',
                    'email' => 'required',
                    'password' => 'required', 
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'exc' => false,
                    'data' => 'body not valid'
                ], 422);
            }  
            $user= Auth::user();  
            $new = [
                'name' => $validator['name'],
                'email' => $validator['email'],
                'password' => Hash::make($validator['password']),
                "kdJaba"=>$user->kdJaba -1,
                "status"=>"Entri",
                "xdata"=>base64_encode(json_encode([
                    "kdMember"=> $v['kdMember']
                ]))
            ]; 
            try {
                $add = DB::table('users')->insert($new);
            } catch (\Throwable $th) {
                return $this->Mfc->respError($th->errorInfo[2]);
            } 
            if ($add) { 
                $userx = DB::table('users')->where([
                    "email"=>$new['email'],
                    "password"=>$new['password'],
                ])->get()[0]; 
                if(anggota::create([
                    "idAdd"=>$v['kdMember'],
                    "idAdded"=>base64_encode($userx->id),
                    "status"=>1
                ])){
                    return response()->json([
                        'exc' => true,
                        'data' =>$this->_anggota($v['kdMember'])
                    ], 200);
                }
                return $this->Mfc->respError("error, gagal menambahkan anggota !!!");
            }
            return $this->Mfc->respError("error, execute query !!!");
        }
        return $v;
    }
    function userGetter(){
        $v = $this->Mfc->portal();
        if($v['exc']){     
            return response()->json([
                'exc' => true,
                'data' =>$this->_anggota($v['kdMember'])
            ], 200);
        }
        return $v;
    }
    function _anggota($id){
        $select = " a.id ,a.idAdd, a.idAdded,a.status,
                b.name,b.email ";
        $dataAdd = DB::select("
            select ".$select." ,1 as saya
            from anggotas a join
            users b on 
                a.idAdded = TO_BASE64(b.id)
            where a.idAdd = '".$id."' and
            a.aktif =1
        ");
        $dataAdded = DB::select("
            select ".$select." ,0 as saya
            from anggotas a join
            users b on 
                a.idAdd = TO_BASE64(b.id)
            where a.idAdded = '".$id."' and
            a.aktif =1
        ");
        return array_merge($dataAdd,$dataAdded);
    } 
    function userUndang(Request $request){
        $v = $this->Mfc->portal();
        if($v['exc']){    
            $valid = $request;
            try {
                $valid = $valid->validate([  
                    'email' => 'required' 
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'exc' => false,
                    'data' => 'body not valid'
                ], 422);
            }   
            $userx = DB::table('users')->where([
                "email"=>$valid['email']
            ])->get(); 
            if(count($userx)>0){ 
                $userx= $userx[0]; 
                try {
                    $cdata = anggota::where("idAdded",base64_encode($userx->id))->get()[0];
                    return $this->Mfc->respError("error, anggota tersebut telah terdafar !!!");
                } catch (\Throwable $th) { 
                } 
                if(base64_encode($userx->id)==$v['kdMember']){
                    return $this->Mfc->respError("error, jangan berteman dengan diri anda sendiri !!!");
                }
                if(anggota::create([
                    "idAdd"=>$v['kdMember'],
                    "idAdded"=>base64_encode($userx->id),
                    "status"=>0
                ])){
                    return response()->json([
                        'exc' => true,
                        'data' =>$this->_anggota($v['kdMember'])
                    ], 200);
                }
            }
            
            return $this->Mfc->respError("error,tidak dapat menemukan anggota !!!");
        }
        return $v;
    }
    function batalkanAnggota(Request $request){
        $v = $this->Mfc->portal();
        if($v['exc']){    
            $valid = $request;
            try {
                $valid = $valid->validate([  
                    'id' => 'required',
                    'idAdd' => 'required',
                    'idAdded' => 'required' 
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'exc' => false,
                    'data' => 'body not valid'
                ], 422);
            }   
            
            if(
                anggota::where($valid)
                ->update([
                    "aktif"=>0
                ])
            ){ 
                return response()->json([
                    'exc' => true,
                    'data' =>[]
                ], 200);
            }
            
            return $this->Mfc->respError("error,execute query !!!");
        }
        return $v;
    }
    function terimaAnggota(Request $request){
        $v = $this->Mfc->portal();
        if($v['exc']){    
            $valid = $request;
            try {
                $valid = $valid->validate([  
                    'id' => 'required',
                    'idAdd' => 'required',
                    'idAdded' => 'required' 
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'exc' => false,
                    'data' => 'body not valid'
                ], 422);
            }   
            
            if(
                anggota::where($valid)
                ->update([
                    "status"=>1
                ])
            ){ 
                return response()->json([
                    'exc' => true,
                    'data' =>[]
                ], 200);
            }
            
            return $this->Mfc->respError("error,execute query !!!");
        }
        return $v;
    }
    
}
