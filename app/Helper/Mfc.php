<?php
namespace App\Helper;
use Illuminate\Support\Facades\DB;
class Mfc {
    function portal($user){
        if(!empty($user->id)){
            return [
                "exc"=>true,
                "ta"=>"2024",
                "kdMember"=>base64_encode($user->id)
            ];
        }
        return [
            "exc"=>false,
            "msg"=>" user can't ID !!!"
        ];
    }
}   
?>