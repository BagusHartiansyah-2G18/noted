<?php

namespace App\Http\Controllers;
use App\Helper\Mfc;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use Illuminate\Http\Request;

class SfMfc extends Controller {
    private $Mfc; 
    public function __construct()
    { 
        $this->Mfc = new Mfc(); 
        $this->middleware('auth');
    }
    function uploadFile(Request $request){
        $v = $this->Mfc->portal();
        if($v['exc']){ 
            $request = $request->all();
            $namaFile = $this->_uploadImage($request['files']['data'],"fileEntri/".$request['files']['nama']);
            return $this->Mfc->resp($namaFile);
        }
        return $v;
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
            // $flokasi.=$split[0]."/";
            // $nama=$split[count($split)-1];
        }
        // return print_r($file);
        // $nama=explode(".",$nama);
        // switch($nama[count($nama)-1]){
        //     case "png":$image=substr($file,22);break;
        //     case "PNG":$image=substr($file,22);break;
        //     case "pdf":$image=substr($file,22);break;
        //     default:$image=substr($file,23);break;
        // }
        // $image=substr($file,23);
        // return print_r($nama[1]);
        date_default_timezone_set("America/New_York");
        // $namaFile=$nama[count($nama)-2]."-".date("Y-m-d-h-i-sa").".".$nama[count($nama)-1];
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
