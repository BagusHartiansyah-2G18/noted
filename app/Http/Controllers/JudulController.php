<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helper\Mfc;
use App\Models\judul;
use App\Models\judul_file;
use App\Models\anggota; 
use App\Models\publikasi;

use Illuminate\Support\Facades\Storage;
use App\Http\Resources\judulR;
use Dotenv\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\data_form;
use App\Models\value_forms;


class JudulController extends Controller
{
    private $Mfc; 
    public function __construct()
    { 
        $this->Mfc = new Mfc();
        $this->middleware('auth');
    }
    public function index(Request $request){
        
        $portal = $this->Mfc->portal();
        if($portal['exc']){
            $validator = $request;
            try {
                $validator = $validator->validate([ 
                    'tingkat' => 'required', 
                ]);
            } catch (\Throwable $th) {
                return response()->json($this->Mfc->respError('body not valid'), 422);
            }
            return response()->json(
                $this->Mfc->resp([
                "induk"=> $this->getData($portal['kdMember'],$validator['tingkat']),
                "dkategori"=>value_forms::where("kdDF","354e3a3751ceb3131125a09be6e4436a")->get()
                ])
            , 200);
        }
        // return response()->json($this->Mfc->respError('error execute !!!'), 200);
        // return response()->json($this->Mfc->resp([]), 200);

        return response()->json($portal, 200);
    }
    function getData($kdMember,$tingkat){
        return judul::where('tingkat',$tingkat)
            ->where('kdMember',$kdMember)
             ->where('aktif',1)
             ->orderby('judul')
            ->get();  
    }
    public function addx(Request $request){ 
        $portal = $this->Mfc->portal();
        if($portal['exc']){
            $validator = $request;
            try {
                $validator = $validator->validate([
                    'judul'     => 'required',
                    'ringkasan'   => 'required',
                ]);
            } catch (\Throwable $th) {
                return response()->json($this->Mfc->respError('body not valid'), 422);
            } 
            $kdJudul = 1; 
            $dt = DB::select(" 
                select kdJudul from judul
                where tingkat=0 and
                kdMember='".$portal['kdMember']."' and 
                order by kdJudul desc
                limit 1
            ");
            
            if(count($dt)>0){ 
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
                return response()->json(
                    $this->Mfc->resp($this->getData($portal['kdMember'],0))
                , 200);
            }
            return response()->json($this->Mfc->respError('error execute !!!'), 200);
        }
        return response()->json($portal, 200);
    }
    public function upd(Request $request){
        $portal = $this->Mfc->portal();
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
                return response()->json($this->Mfc->respError('body not valid'), 422);
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
                return response()->json($this->Mfc->resp([]), 200);
            }
            return response()->json($this->Mfc->respError('error execute !!!'), 200);
        }
        return response()->json($portal, 200);
    }
    public function del(Request $request){
        $portal = $this->Mfc->portal();
        if($portal['exc']){
            $validator = $request;
            try {
                $validator = $validator->validate([
                    'kdJudul' => 'required',
                    'kdMember' => 'required',
                    'tingkat'=> 'required',
                ]);
            } catch (\Throwable $th) {
                return response()->json($this->Mfc->respError('body not valid'), 422);
            }
            if(
                judul::where('kdJudul',$validator['kdJudul'])
                ->where('kdMember',$validator['kdMember'])
                ->where('tingkat',$validator['tingkat'])
                ->update([
                    "aktif"=>0 
                ])
            ){
                return response()->json($this->Mfc->resp([]), 200);
            }
            return response()->json($this->Mfc->respError('error execute !!!'), 200);
        }
        return response()->json($portal, 200);
    }

    public function add(Request $request){
        $portal = $this->Mfc->portal();
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
                return response()->json($this->Mfc->respError('body not valid'), 422);
            }
            
            $readKD = $this->readKdJudul($validator['kdJudul']);
            $cekJudul=$readKD[0];
            $sub=$readKD[1]; 
            
            $lengthKdJudul = strlen($validator['kdJudul'])+4;
            if(count($sub)!=0){
                $lengthKdJudul= strlen($validator['kdJudul'])+2;
            }
            $query =" substr(kdJudul,".$lengthKdJudul.") ";
            $queryNotTingkat0 = "and kdJudul like '".($validator['tingkat']==1?$validator['kdJudul']."MFC":$validator['kdJudul'])."%'";
            if($validator['tingkat']==0){
                $lengthKdJudul= 0;
                $query =" (kdJudul) ";
                $queryNotTingkat0 ='';
            } 

            $kdJudul = 1;
            $dt = DB::select(" 
                select ".$query."  as kdJudul from judul
                where tingkat = '".$validator['tingkat']."' and
                kdMember='".$portal['kdMember']."' 
                ".$queryNotTingkat0."
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
                        ->where('kdJudul','like',''.($validator['tingkat']==1?$validator['kdJudul']."MFC":$validator['kdJudul'])."%")
                        ->where('aktif',1)
                        ->get(); 
                    $dt=[
                        'induk'=>$data,
                        'sub'=>$sub
                    ];
                }
                return response()->json($this->Mfc->resp($dt) , 200);
            }
            return response()->json($this->Mfc->respError('error execute !!!'), 200);
        }
        return response()->json($portal, 200);
    }


    public function sub(Request $request){
        $portal = $this->Mfc->portal();
        if($portal['exc']){
            $validator = $request;
            try {
                $validator = $validator->validate([ 
                    'tingkat' => 'required', 
                    'kdMember' => 'required', 
                    'kdJudul' => 'required', 
                ]);
            } catch (\Throwable $th) {
                return response()->json($this->Mfc->respError('body not valid'), 422);
            } 
            $data = $this->getDataTurunanInduk(
                $validator['kdJudul'],
                $validator['kdMember'],
                $validator['tingkat']
            );
            $note = $data[count($data)-1]; 
            if(!empty($request['sumber']) && $request['sumber']=="publikasi"){  
                return response()->json(
                    $this->Mfc->resp([
                        'induk'=>$note,
                        'publikasi'=>publikasi::select("kdAnggota")->where($validator)->get()
                    ])
                , 200); 
            }
            $sub=$this->_subWithAtribut($validator); 
            
            $file=judul_file::where('kdMember',$note['kdMember'])
                ->where('kdJudul',$note['kdJudul'])
                ->get();
            $form = $this->_formWithValue($note,$validator);
            
            return response()->json(
                $this->Mfc->resp([
                    'induk'=>$data,
                    'sub'=>$sub,
                    'file'=>$file,
                    'form'=>$form,
                    "dkategori"=>value_forms::where("kdDF","354e3a3751ceb3131125a09be6e4436a")->get()
                ])
            , 200); 
        }
    }
    public function subFileUpload(Request $request){
        $portal = $this->Mfc->portal();
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
            $file=judul_file::where('kdMember',$validator['kdMember'])
                ->where('kdJudul',$validator['kdJudul'])
                ->get();  
            return response()->json([
                'exc' => true,
                'data' => [
                    'induk'=>$data,
                    'file'=>$file, 
                ]
            ], 200);
        }
    }
    // batas 
 
    function _subWithAtribut($validator){
        $sub=judul::where('tingkat',($validator['tingkat']+1))
                ->where('kdMember',$validator['kdMember'])
                ->where('kdJudul','like',''.($validator['tingkat']==0?$validator['kdJudul']."MFC":$validator['kdJudul'])."%")
                ->where('aktif',1)
                ->get();
        foreach ($sub as $key => $v) {
            $v['file']=judul_file::where('kdMember',$v['kdMember'])
            ->where('kdJudul',$v['kdJudul'])
            ->get();
            $v['form']=data_form::where([
                "kdNote"=>$v['kdJudul'],
                "kdMember"=>$v['kdMember'],
                "tingkat"=>$v['tingkat']
            ])->get();
                    
            foreach ($v['form'] as $keyx => $vx) {  
                $vx['dvalue']= DB::select(" 
                    select a.*, b.name
                    from value_forms a
                    join users b on 
                        a.kdMember = TO_BASE64(b.id)
                    where a.kdDF='".
                    $this->Mfc->getKeyValue(array_merge($validator,["kd"=>$vx['kd'], "kdNote"=>$vx['kdNote'],"tingkat"=>$vx['tingkat']]))
                    ."' and  
                    a.aktif =1
                ");
            };
        };  

        return $sub;
    }
    function _formWithValue($note, $validator){
        $form= data_form::where([
            "kdNote"=>$note['kdJudul'],
            "kdMember"=>$note['kdMember'],
            "tingkat"=>$note['tingkat']
        ])->get();
        foreach ($form as $keyx => $vx) { 
            $vx['dvalue']= DB::select(" 
               select a.*, b.name
               from value_forms a
               join users b on 
                   a.kdMember = TO_BASE64(b.id)
               where a.kdDF='".
               $this->Mfc->getKeyValue(array_merge($validator,["kd"=>$vx['kd'], "kdNote"=>$validator['kdJudul']]))
               ."' and  
               a.aktif =1
           ");
       }; 
       return $form;
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
    public function actUFSubNote(Request $request){
        $portal = $this->Mfc->portal();
        if($portal['exc']){
            $request = $request->all();  
            $namaFile =''; 
            if($request['files']!="-" && count($request['files'])>1){
                $namaFile = $this->_uploadImage($request['files']['data'],"fileUploadSubNote/".$request['files']['nama']); 
            } 

            $dfile=judul_file::where('kdMember',$portal['kdMember'])
                ->where('kdJudul',$request['kdJudul'])
                ->orderByDesc('ind')
                ->limit(1)
                ->get();  
            $ind = 1; 
            if(count($dfile)>0){ 
                $ind = $dfile[0]->ind+1; 
            }
            $newJudul = new judul_file;
            $newJudul->keterangan =$request['judul']; 
            $newJudul->kdMember =$portal['kdMember'];
            $newJudul->kdJudul =$request['kdJudul'];
            $newJudul->ind =$ind;
            $newJudul->file=$namaFile;
            $newJudul->kdMemberSub='';
            $newJudul->url =($request['url']==''?'-':$request['url']);
            if($newJudul->save()){
                $data = judul_file::where('kdMember',$portal['kdMember'])
                ->where('kdJudul',$request['kdJudul'])
                ->get();
                return response()->json($this->Mfc->resp($data), 200);
            } 
            return response()->json($this->Mfc->respError('error execute !!!'), 200);
        }
        return response()->json($portal, 200);
    }
    public function _uploadImage($file,$nama){
        $split=explode("/",$nama);
        $flokasi="sppd/";// default foldar jika ber ubah maka tambahakan dinamanya
        if(count($split)>1){
            $flokasi='';
            foreach ($split as $key => $v) {
                if($key==count($split)-1){
                    $nama=$v;
                }else{
                    $flokasi.=$v."/";
                }
            } 
        }
         
        date_default_timezone_set("America/New_York");
        $namaFile=date("Y-m-d-h-i-sa")."-".$nama;
 
        $delspace=explode(" ",$namaFile);
        $namaFile="";
        foreach ($delspace as $key => $value) {
            $namaFile.=$value;
        }
        $lokasiFile='public/pdf/'.$flokasi.$namaFile;
        Storage::put($lokasiFile,base64_decode($file));
        return $namaFile;
    }
}
