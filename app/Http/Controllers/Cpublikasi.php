<?php

namespace App\Http\Controllers;
use App\Helper\Mfc;
use App\Models\judul;
use App\Models\publikasi;
use App\Models\value_forms;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Cpublikasi extends Controller{
    private $Mfc; 
    public function __construct()
    { 
        $this->Mfc = new Mfc(); 
        $this->middleware('auth');
    }
    
    function updJenisSharing(Request $request){
        $portal = $this->Mfc->portal();
        if($portal['exc']){
            $r = $request;
            try {
                $r = $r->validate([ 
                    'kdMember' => 'required',
                    'kdJudul' => 'required',
                    'tingkat' => 'required',
                    'jsCatatan' => 'required' 
                ]);
            } catch (\Throwable $th) {
                return response()->json($this->Mfc->respError('body not valid'), 422);
            }
            if (
                judul::where([
                    "kdMember"=>$r['kdMember'],
                    "kdJudul"=>$r['kdJudul'],
                    "tingkat"=>$r['tingkat']
                ])->update([
                    "jsCatatan"=>$r['jsCatatan'],
                ]) 
            ) {
                return response()->json($this->Mfc->resp([]), 200);
            }
            return response()->json($this->Mfc->respError('error execute !!!'), 200);
        }
    }
    function updPublikasi(Request $request){
        $portal = $this->Mfc->portal();
        if($portal['exc']){
            $r = $request;
            try {
                $r = $r->validate([ 
                    'kdMember' => 'required',
                    'kdJudul' => 'required',
                    'tingkat' => 'required',
                    'dpCatatan' => 'required' 
                ]);
            } catch (\Throwable $th) {
                return response()->json($this->Mfc->respError('body not valid'), 422);
            } 
            if (
                judul::where([
                    "kdMember"=>$r['kdMember'],
                    "kdJudul"=>$r['kdJudul'],
                    "tingkat"=>$r['tingkat']
                ])->update([
                    "dpCatatan"=>$r['dpCatatan'],
                ]) 
            ) {
                return response()->json($this->Mfc->resp([]), 200);
            }
            return response()->json($this->Mfc->respError('error execute !!!'), 200);
        }
    }
    function setAnggota(Request $request){
        $portal = $this->Mfc->portal();
        if($portal['exc']){
            $r = $request->all();
            $validator = $r;
            unset($validator['kdAnggota']);
            publikasi::where($validator)->delete();
            foreach ($r['kdAnggota'] as $key => $value) {
                $validator = $r;
                $validator['kdAnggota']= $value;
                publikasi::create($validator);
            }
            return response()->json($this->Mfc->resp([]), 200);
        }
    }

    // semua value harus memiliki object 
    function getNoteSharing(){
        $portal = $this->Mfc->portal();
        if($portal['exc']){  
            // $dpublik = publikasi::where([
            //     "kdAnggota"=>$portal['kdMember']
            // ])->get();
            
            return response()->json($this->Mfc->resp([
                "dpublik"=>$this->DNSharing($portal['kdMember']),
                "dkategori"=>value_forms::where("kdDF","354e3a3751ceb3131125a09be6e4436a")->get()
            ]), 200);
        }
    }
    function getNoteSharingPublic(){
        $portal = $this->Mfc->portal();
        if($portal['exc']){    
            return response()->json($this->Mfc->resp([
                "dpublik"=>$this->DNSharingPublic(),
                "dkategori"=>value_forms::where("kdDF","354e3a3751ceb3131125a09be6e4436a")->get()
            ]), 200);
        }
    }
    
    function DNSharing($kdMember){
        return DB::select("
            select a.*, b.created_at as dateS
            from judul a 
            join publikasi b on
                a.kdJudul = b.kdJudul and
                a.kdMember = b.kdMember and
                a.tingkat = b.tingkat 
            where b.kdAnggota ='".$kdMember."' and
            a.jsCatatan ='2'
        ");
    }
    function DNSharingPublic(){
        return DB::select("
            select a.*, a.created_at as dateS
            from judul a  
            where  a.jsCatatan ='3'
        ");
    } 
}
