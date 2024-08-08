<?php

namespace App\Http\Controllers;
use App\Helper\Mfc;
use App\Models\judul;
use App\Models\publikasi;
use Illuminate\Http\Request;

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
}
