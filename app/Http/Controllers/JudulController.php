<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helper\Mfc;
use App\Models\judul;
use App\Http\Resources\judulR;
use Dotenv\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class JudulController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index(Request $request)
    {
        $portal = Mfc::portal(Auth::user());
        if($portal['exc']){
            $validator = $request;
            try {
                $validator = $validator->validate([ 
                    'tingkat' => 'required', 
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'exc' => false,
                    'data' => 'body not valid'
                ], 422);
            }
            return response()->json([
                'exc' => true,
                'data' => $this->getData($portal['kdMember'],$validator['tingkat'])
            ], 200);
        }
    }
    function getData($kdMember,$tingkat){
        return DB::select(" 
            select * from judul
            where tingkat = '".$tingkat."' and
            kdMember='".$kdMember."'
            order by judul asc
        ");
    }
    public function addx(Request $request){
        // $request->session()->put('duser',$users);
        // if($request->session()->has('duser')){
        //     $user =$request->session()->get('duser');
        // }
        // $user =Auth::user();
        // return new judulR(true, 'List Data Posts', $request->session());

        $portal = Mfc::portal(Auth::user());
        if($portal['exc']){
            $validator = $request;
            try {
                $validator = $validator->validate([
                    'judul'     => 'required',
                    'ringkasan'   => 'required',
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'exc' => false,
                    'data' => 'body not valid'
                ], 422);
            }
            // if ($validator->fails()) {
            //     return response()->json($validator->errors(), 422);
            // }
            // return print_r($validator);
            //upload image
            // $image = $request->file('image');
            // $image->storeAs('public/posts', $image->hashName());
            $kdJudul = 1;
            // $dt = DB::statement(" select * from judul");
            // where length(kdJudul) = '".$validator['ckdJudul']."' and
            $dt = DB::select(" 
                select kdJudul from judul
                where tingkat=0 and
                kdMember='".$portal['kdMember']."' and
                
                order by kdJudul desc
                limit 1
            ");
            
            if(count($dt)>0){ 
                // return print_r($dt[0]->kdJudul);
                $kdJudul = $dt[0]->kdJudul+1;
            }
            if(
                judul::create([
                    'judul'     => $validator['judul'],
                    'ringkasan'   => $validator['ringkasan'],
                    'kdMember'=> $portal['kdMember'],
                    'kdJudul' =>$kdJudul,
                    'tingkat' =>0,
                    'kdMemberSub' =>''
                ])
            ){
                return response()->json([
                    'exc' => true,
                    'data' => $this->getData($portal['kdMember'],0)
                ], 200);
            }
            return response()->json([
                'exc' => false,
                'msg' => 'error execute !!!'
            ], 200);
        }
        return response()->json([
            'exc' => false,
            'msg' => $portal['msg']
        ], 200);
    }
    public function upd(Request $request){
        $portal = Mfc::portal(Auth::user());
        if($portal['exc']){
            $validator = $request;
            try {
                $validator = $validator->validate([
                    'judul'     => 'required',
                    'ringkasan'   => 'required',
                    'kdJudul' => 'required',
                    'kdMember' => 'required',
                    'tingkat'=> 'required',
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'exc' => false,
                    'data' => 'body not valid'
                ], 422);
            }
            if(
                judul::where('kdJudul',$validator['kdJudul'])
                ->where('kdMember',$validator['kdMember'])
                ->where('tingkat',$validator['tingkat'])
                ->update([
                    "judul"=>$validator['judul'],
                    "ringkasan"=>$validator['ringkasan']
                ])
            ){
                return response()->json([
                    'exc' => true,
                    'data' => []
                ], 200);
            }
            return response()->json([
                'exc' => false,
                'msg' => 'error execute !!!'
            ], 200);
        }
        return response()->json([
            'exc' => false,
            'msg' => $portal['msg']
        ], 200);
    }
    public function del(Request $request){
        $portal = Mfc::portal(Auth::user());
        if($portal['exc']){
            $validator = $request;
            try {
                $validator = $validator->validate([
                    'kdJudul' => 'required',
                    'kdMember' => 'required',
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'exc' => false,
                    'data' => 'body not valid'
                ], 422);
            }
            if(
                judul::where('kdJudul',$validator['kdJudul'])
                ->where('kdMember',$validator['kdMember'])
                ->delete()
            ){
                return response()->json([
                    'exc' => true,
                    'data' => []
                ], 200);
            }
            return response()->json([
                'exc' => false,
                'msg' => 'error execute !!!'
            ], 200);
        }
        return response()->json([
            'exc' => false,
            'msg' => $portal['msg']
        ], 200);
    }

    public function add(Request $request){
        $portal = Mfc::portal(Auth::user());
        if($portal['exc']){
            $validator = $request;
            try {
                $validator = $validator->validate([
                    'judul'     => 'required',
                    'ringkasan'   => 'required',
                    'kdJudul' => 'required',
                    'kdMember' => 'required',
                    'tingkat' => 'required',
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'exc' => false,
                    'data' => 'body not valid'
                ], 422);
            }
            
            $readKD = $this->readKdJudul($validator['kdJudul']);
            $cekJudul=$readKD[0];
            $sub=$readKD[1]; 
            
            $lengthKdJudul = strlen($validator['kdJudul'])+4;
            if(count($sub)!=0){
                $lengthKdJudul= strlen($validator['kdJudul'])+2;
            }
            $query =" substr(kdJudul,".$lengthKdJudul.") ";
            if($validator['tingkat']==0){
                $lengthKdJudul= 0;
                $query =" (kdJudul) ";
            }

            $kdJudul = 1;
            $dt = DB::select(" 
                select ".$query."  as kdJudul from judul
                where tingkat = '".$validator['tingkat']."' and
                kdMember='".$portal['kdMember']."' and
                kdJudul like '%".($validator['tingkat']==1?$validator['kdJudul']."MFC":$validator['kdJudul'])."%'
                order by cast(".$query." as int) desc
                limit 1
            ");
            
            if(count($dt)>0){  
                $kdJudul = $dt[0]->kdJudul+1;
            }

            if($validator['tingkat']>1){
                $kdJudul=$validator['kdJudul']."#".$kdJudul;
            }else if($validator['tingkat']==1){
                $kdJudul=$validator['kdJudul']."MFC".$kdJudul;
            }

            $newJudul = new judul;
            $newJudul->judul =$validator['judul'];
            $newJudul->ringkasan =$validator['ringkasan'];
            $newJudul->kdMember =($validator['tingkat']==0?$portal['kdMember']:$validator['kdMember']);
            $newJudul->kdJudul =$kdJudul;
            $newJudul->tingkat =$validator['tingkat'];
            $newJudul->kdMemberSub =($portal['kdMember'] == $validator['kdMember'] ? '':$portal['kdMember']);
            if(
                $newJudul->save()
            ){
                $dt = [];
                if($validator['tingkat']==0){
                    $dt=$this->getData($portal['kdMember'],$validator['tingkat']);
                }else{
                    $data = $this->getDataTurunanInduk(
                        $validator['kdJudul'],
                        $validator['kdMember'],
                        $validator['tingkat']-1
                    );
                    // return print_r($data);
                    $sub=judul::where('tingkat',($validator['tingkat']))
                        ->where('kdMember',$validator['kdMember'])
                        ->where('kdJudul','like','%'.($validator['tingkat']==1?$validator['kdJudul']."MFC":$validator['kdJudul'])."%")
                        ->get(); 
                    $dt=[
                        'induk'=>$data,
                        'sub'=>$sub
                    ];
                }
                return response()->json([
                    'exc' => true,
                    'data' => $dt
                ], 200);
            }
            return response()->json([
                'exc' => false,
                'msg' => 'error execute !!!'
            ], 200);
        }
        return response()->json([
            'exc' => false,
            'msg' => $portal['msg']
        ], 200);
    }


    public function sub(Request $request){
        $portal = Mfc::portal(Auth::user());
        if($portal['exc']){
            $validator = $request;
            try {
                $validator = $validator->validate([ 
                    'tingkat' => 'required', 
                    'kdMember' => 'required', 
                    'kdJudul' => 'required', 
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'exc' => false,
                    'data' => 'body not valid'
                ], 422);
            } 
            $data = $this->getDataTurunanInduk(
                $validator['kdJudul'],
                $validator['kdMember'],
                $validator['tingkat']
            );
            // return print_r($data);
            $sub=judul::where('tingkat',($validator['tingkat']+1))
                ->where('kdMember',$validator['kdMember'])
                ->where('kdJudul','like','%'.($validator['tingkat']==0?$validator['kdJudul']."MFC":$validator['kdJudul'])."%")
                ->get(); 
            return response()->json([
                'exc' => true,
                'data' => [
                    'induk'=>$data,
                    'sub'=>$sub
                ]
            ], 200);
        }
    }
    function readKdJudul($kdJudul) {
        $cekJudul = explode("MFC",$kdJudul);
        $sub=[]; 
        if(count($cekJudul)>1){ 
            // $sub=$cekJudul[1];
            $sub = explode("#",$cekJudul[1]);
            $cekJudul = $cekJudul[0]; //jadi kdJudul
        }else{
            $cekJudul = $kdJudul;
        }
        return[$cekJudul,$sub];
    }
    function getDataTurunanInduk($kdJudul,$kdMember,$tingkat){
        // $cekJudul = explode($kdJudul,"MFC");
        // $sub=[];
        // if(count($cekJudul)>1){
        //     $cekJudul = $cekJudul[0]; //jadi kdJudul
        //     $sub = explode($cekJudul[1],"#");
        // }else{
        //     $cekJudul = $kdJudul;
        // }
        $readKD = $this->readKdJudul($kdJudul);
        $cekJudul=$readKD[0];
        $sub=$readKD[1];
        
        $fdt =judul::where('tingkat',0)
            ->where('kdMember',$kdMember)
            ->where('kdJudul',$cekJudul)
            ->get()->toArray()[0];
        // $object  = (object) $fdt; 
        $fdata = [];
        array_push($fdata,$fdt); 
        $itingkat=1;
        $val='';
        foreach ($sub as $key => $v) {
            if($key>0){
                $val.="#".$v;
            }else{
                $val = $v;
            }
            // print_r($cekJudul."MFC".$val."<br>");
            array_push($fdata,
                judul::where('tingkat',$itingkat)
                ->where('kdMember',$kdMember)
                ->where('kdJudul',$cekJudul."MFC".$val)
                ->get()->toArray()[0]
            );
            $itingkat++;
        }
        return $fdata;
    }
}
