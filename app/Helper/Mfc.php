<?php
namespace App\Helper;
use Illuminate\Support\Facades\DB;
use App\Models\User; 
use Illuminate\Support\Facades\Auth;

class Mfc {
    // function portal($user){
    //     if(!empty($user->id)){
    //         return [
    //             "exc"=>true,
    //             "ta"=>"2024",
    //             "kdMember"=>base64_encode($user->id),
    //             "name"=>$user->name
    //         ];
    //     }
    //     return (new static)->respError(" user can't ID !!!");
    // }
    function portal(){ 
        $user= Auth::user();
        // return print_r($user);
        if(!empty($user->id)){
            return [
                "exc"=>true,
                "ta"=>"2024",
                "kdMember"=>base64_encode($user->id),
                "name"=>$user->name
            ];
        }
        return (new static)->respError(" user can't ID !!!");
    }
    function apiPortal($v){
        $v = json_decode(base64_decode($v)); 
         // select MD5(concat('{"kdMember":"',TO_BASE64(id),'","updated_at":"',updated_at,'","aktif":',aktif,'}')) from users where aktif = 1
        $duser = DB::select(' 
            select  * 
            from users where
            MD5(concat(\'{"kdMember":"\',TO_BASE64(id),\'","updated_at":"\',updated_at,\'","aktif":\',aktif,\'}\')) =\''.$v->mfc.'\' and
            aktif = 1
        ');
        if(count($duser)>0){
            return [
                "dparam"=>$v,
                "exc"=>true,
                "duser"=>$duser[0],
            ];
        }
        return (new static)->respError("tidak sesuai keamanan dengan keamanan sistem !!!");
    }
    function respError($msg){
        return [
            "exc"=>false,
            "msg"=>$msg
        ];
    }
    function resp($data){
        return [
            "exc"=>true,
            "data"=>$data
        ];
    }
    function log($dt){
        echo "<pre>";
        print_r($dt);
    }
    function getKeyValue($v){
        return md5(json_encode([
            'kdMember' => $v['kdMember'],
            'kdNote' => $v['kdNote'],
            'tingkat' => $v['tingkat'],
            'kdForm' => $v['kd'],
        ]));
    }
}   
?>