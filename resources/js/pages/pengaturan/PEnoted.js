import React,{ useEffect,useRef,useState    } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { json, Link, useParams } from 'react-router-dom';
import { userMenuS, dtShare } from "../../states/sf/html/action"  

import { noteSubLangsung } from "../../states/publikasi/action";

import PPcatatan from "../../components/pages/publikasi/pengaturan/PPcatatan"
import FEinputRadio from "../../components/formEntri/inputRadio";

import { updJenisSharing, updPublikasi,_anggotaSharing } from "../../states/publikasi/action";
import { __anggota} from "../../states/anggota/action";
import PPshareMember from '../../components/pages/publikasi/pengaturan/PPshareMember';

export default function PEnoted() {
    const { pubN, dangg} = useSelector((state) => state); 
    
    const dispatch = useDispatch(); 
    const { value } = useParams();
    const {kdMember,kdJudul,tingkat} = JSON.parse(atob(value)); 
 
    const [share,_share] =useState([]); 
    
    useEffect(() => {  
        dispatch(noteSubLangsung({
            tingkat,
            kdJudul,
            kdMember,
            sumber:"publikasi"
        })) 
        dispatch(__anggota()); 
        dispatch(userMenuS({v:46,sub:2, isi:''}));  
    }, [dispatch]);
    if(Object.keys(pubN).length==0 || pubN.length>0){
        return '';
    } 
    const respPublikasi=(fdt)=>{  
        dispatch(
            updPublikasi({ kdMember,kdJudul,tingkat, dpCatatan:btoa(JSON.stringify({...fdt})) })
        ); 
    } 
    const respShare=(fdt)=>{ 
        _share(fdt.value);
        if(!fdt.dt.star){ 
            updJenisSharing({ kdMember,kdJudul,tingkat,jsCatatan:fdt.value[1]});
        } 
    }
     
    const { induk, publikasi } = pubN;
    
    if(share.length==0){
        _share(dtShare[(induk.jsCatatan)-1])
    }
    
    const perbaruiAnggota=(dselected)=>{  
        _anggotaSharing({
            kdMember,kdJudul,tingkat,
            kdAnggota:dselected.map(v=>{
                if(v.saya){
                    return v.idAdded;
                }
                return v.idAdd;
            })
        }) 
    }  
    
    return ( 
        <div class="form-style-10 " style={{width:"90%"}}>
            <h1 className="bdark cwarning">Pengaturan Catatan<span><b>{induk.judul}</b></span></h1>
            <div class="section cwarning"><span className="bwarning">1</span><b>Share</b></div>
            <div className="inner-wrap Flex-b45p cdark">
                <div className="listB">
                    <FEinputRadio
                        dt={{
                            valueOption:dtShare,
                            star:true
                        }}
                        plac={"Pilih Jenis Sharing"}
                        resVal={respShare}
                        key={0}
                        value={share}
                        
                    ></FEinputRadio> 
                </div>
                <div className="listB">
                    <PPcatatan
                        plac="Daftar Publikasi Data"
                        resVal={respPublikasi}
                        value={induk.dpCatatan}
                    ></PPcatatan> 
                </div>  
            </div> 
            {(
                share[1] == 2 &&
                <>
                    <div class="section cwarning"><span className="bwarning">2</span><b>Khusus, Pilih Anggota</b></div> 
                    <hr/>
                    <PPshareMember
                        dmember={dangg}
                        dmSelect={publikasi}
                        resVal={perbaruiAnggota}
                    ></PPshareMember>
                </>
            )}
            {/* {(
                induk.dpCatatan.xformEntri  &&
                <>
                    <div class="section cwarning"><span className="bwarning">3</span><b>Data Form Entri, Pilih Tujuan Form</b></div> 
                    <hr/>
                    <PPshareMember
                        dmember={dangg}
                        dmSelect={publikasi}
                        resVal={perbaruiAnggota}
                    ></PPshareMember>
                </>
            )} */}
            
        </div>
       
    );
}