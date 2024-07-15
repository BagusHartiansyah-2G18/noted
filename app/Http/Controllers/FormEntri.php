<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helper\Mfc;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use App\Models\data_form;
use App\Models\value_forms;

class formEntri extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function getForm(Request $request){
        $portal = Mfc::portal(Auth::user());
        if($portal['exc']){
            $validator = $request;
            try {
                $validator = $validator->validate([ 
                    'kdMember' => 'required',
                    'kdNote' => 'required',
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
                'data' => data_form::where($validator)->get()
            ], 200);
        }
    }
    public function setForm(Request $request){
        $portal = Mfc::portal(Auth::user());
        if($portal['exc']){
            $validator = $request;
            try {
                $validator = $validator->validate([ 
                    'kdMember' => 'required',
                    'kdNote' => 'required',
                    'tingkat' => 'required',
                    'kd' => 'required',
                    'tujuan' => 'required' 
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'exc' => false,
                    'data' => 'body not valid'
                ], 422);
            }
            if (data_form::create($validator)) {
                return response()->json([
                    'exc' => true,
                    'data' => data_form::where([
                        'kdMember' => $validator['kdMember'],
                        'kdNote' => $validator['kdNote'],
                        'tingkat' => $validator['tingkat'],
                    ])->get()
                ], 200);
            }
            return response()->json([
                'exc' => false,
                'data' => 'gagal menyimpan data'
            ], 200);
        }
    }
    public function updForm(Request $request){
        $portal = Mfc::portal(Auth::user());
        if($portal['exc']){
            $validator = $request;
            try {
                $validator = $validator->validate([ 
                    'kdMember' => 'required',
                    'kdNote' => 'required',
                    'tingkat' => 'required',
                    'kd' => 'required',
                    'tujuan' => 'required' 
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'exc' => false,
                    'data' => 'body not valid'
                ], 422);
            }  
            if (
                data_form::where([
                    "kdMember"=>$validator['kdMember'],
                    "kdNote"=>$validator['kdNote'],
                    "tingkat"=>$validator['tingkat'],
                    "kd"=>$validator['kd']
                ])->update([
                    "tujuan"=>$validator['tujuan']
                ])
            ) {
                return response()->json([
                    'exc' => true,
                    'data' => []
                ], 200);
            }
            return response()->json([
                'exc' => false,
                'data' => 'gagal menyimpan data'
            ], 200);
        }
    }
 
    public function setTypeForm(Request $request){
        $portal = Mfc::portal(Auth::user());
        if($portal['exc']){
            $validator = $request;
            try {
                $validator = $validator->validate([ 
                    'kdMember' => 'required',
                    'kdNote' => 'required',
                    'tingkat' => 'required',
                    'kd' => 'required',
                    'data' => 'required' 
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'exc' => false,
                    'data' => 'body not valid'
                ], 422);
            } 
            if (
                data_form::where([
                    "kdMember"=>$validator['kdMember'],
                    "kdNote"=>$validator['kdNote'],
                    "tingkat"=>$validator['tingkat'],
                    "kd"=>$validator['kd']
                ])->update([
                    "data"=>$validator['data']
                ])
            ) {
                return response()->json([
                    'exc' => true,
                    'data' => []
                ], 200);
            }
            return response()->json([
                'exc' => false,
                'data' => 'gagal menyimpan data'
            ], 200);
        }
    }
    
    // batas Value
    // function getKeyValue($v){
    //     return md5(json_encode([
    //         'kdMember' => $v['kdMember'],
    //         'kdNote' => $v['kdNote'],
    //         'tingkat' => $v['tingkat'],
    //         'kdForm' => $v['kd'],
    //     ]));
    // }
    public function getFormWithKey(Request $request){
        $portal = Mfc::portal(Auth::user());
        if($portal['exc']){
            $validator = $request;
            
            try {
                $validator = $validator->validate([ 
                    'kdMember' => 'required',
                    'kdNote' => 'required',
                    'tingkat' => 'required',
                    'kd'=> 'required',
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'exc' => false,
                    'data' => 'body not valid'
                ], 422);
            } 
            // return print_r($this->getKeyValue($validator));
            $user=false;
            $value = [];
            // return print_r($validator);
            if($validator['kdMember']==$portal['kdMember']){
                $user=true;
                $value = DB::select(" 
                    select a.*, b.name
                    from value_forms a
                    join users b on 
                        a.kdMember = TO_BASE64(b.id)
                    where a.kdDF='".Mfc::getKeyValue($validator)."' and  
                    a.aktif =1
                ");
                // a.kd='".$validator['kd']."' and
            }else{ 
                $value = DB::select(" 
                    select a.*, b.name
                    from value_forms a
                    join users b on 
                        a.kdMember = TO_BASE64(b.id) 
                    where a.kdDF='".Mfc::getKeyValue($validator)."' and
                    a.kdMember='".$portal['kdMember']."' and
                    a.aktif =1
                ");
            }
            
            return response()->json([
                'exc' => true,
                'data' => [
                    "form"=>data_form::where($validator)->get()[0],
                    "value"=>$value,
                    "user"=>$user
                ]
            ], 200);
        }
    }
    public function setValueForm(Request $request){
        $portal = Mfc::portal(Auth::user());
        if($portal['exc']){
            $validator = $request;
            try {
                $validator = $validator->validate([ 
                    'kdDF' => 'required',
                    'kd' => 'required',
                    'data' => 'required' 
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'exc' => false,
                    'data' => 'body not valid'
                ], 422);
            }

            $fdt = value_forms::where([
                'kdDF' => $validator['kdDF'],
                'kdMember'=>$portal['kdMember']
            ])->orderByRaw("CAST(kd AS int) desc")->limit(1)->get();
            if(count($fdt)>0){
                $validator['kd']=$fdt[0]->kd+1;
            } 
            if ( 
                value_forms::create(array_merge($validator,["kdMember"=>$portal['kdMember']]))
            ) {
                return response()->json([
                    'exc' => true,
                    'data' =>["kdMember"=>$portal['kdMember'],"kd"=>$validator['kd'],"name"=>$portal['name']]   
                ], 200);
            }
            return response()->json([
                'exc' => false,
                'data' => 'gagal menyimpan data'
            ], 200);
        }
    }
    public function updValueForm(Request $request){
        $portal = Mfc::portal(Auth::user());
        if($portal['exc']){
            $validator = $request;
            try {
                $validator = $validator->validate([ 
                    'kdDF' => 'required',
                    'kd' => 'required',
                    'data' => 'required',
                    'kdMember'=>'required',
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'exc' => false,
                    'data' => 'body not valid'
                ], 422);
            } 
            if ( 
                value_forms::where([
                    "kdDF"=>$validator['kdDF'],
                    "kd"=>$validator['kd'],
                    "kdMember"=>$validator['kdMember']
                ])->update([
                    'data' => $validator['data'],
                ])
            ) {
                return response()->json([
                    'exc' => true,
                    'data' => []
                ], 200);
            }
            return response()->json([
                'exc' => false,
                'data' => 'gagal menyimpan data'
            ], 200);
        }
    }
    public function delValueForm(Request $request){
        $portal = Mfc::portal(Auth::user());
        if($portal['exc']){
            $validator = $request;
            try {
                $validator = $validator->validate([ 
                    'kdDF' => 'required',
                    'kd' => 'required',
                    'kdMember'=>'required',
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'exc' => false,
                    'data' => 'body not valid'
                ], 422);
            } 
            if ( 
                value_forms::where([
                    "kdDF"=>$validator['kdDF'],
                    "kd"=>$validator['kd'],
                    "kdMember"=>$validator['kdMember']
                ])->update([
                    'aktif' => 0,
                ])
            ) {
                return response()->json([
                    'exc' => true,
                    'data' => []
                ], 200);
            }
            return response()->json([
                'exc' => false,
                'data' => 'gagal menyimpan data'
            ], 200);
        }
    }
    
}
