import React,{ useEffect,useRef,useState    } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { userMenuS, dtShare } from "../../states/sf/html/action"  
import { noteSub,baseUrl } from "../../states/noted/action";

import PPcatatan from "../../components/pages/publikasi/pengaturan/PPcatatan"
import FEinputRadio from "../../components/formEntri/inputRadio";
export default function PEformEntri() {
    const { dnote,  pubN } = useSelector((state) => state); 
    
    const dispatch = useDispatch(); 
    const { value } = useParams();
    const {kdMember,kdJudul,tingkat} = JSON.parse(atob(value)); 

    
    const [share,_share] =useState();

    useEffect(() => { 
        _share(dtShare[0]);
        dispatch(noteSub({
            tingkat,
            kdJudul,
            kdMember
        })) 
        dispatch(userMenuS({v:6,sub:1})); 
    }, [dispatch]);
    if(Object.keys(dnote).length==0 || dnote.length>0){
        return '';
    } 

    const actOpsiShare=()=>{
        switch (share[1]) {
            case 1: return (<>
                <hr/>
                Form Pilih Anggota
            </>)
            case 2: return (<>
                <hr/>
                Link Form Entri
            </>)
        
            default: return "";
        }
    }
    
    const respPublikasi=()=>{
        
    }

    const respShare=(fdt)=>{
        // { value, dt }=fdt
        _share(fdt.value);
    }

    return ( 
        <div class="form-style-10 " style={{width:"90%"}}>
            <h1 className="bdark cwarning">Pengaturan Form Entri<span>judul Note</span></h1>
            <form >
                <div class="section cwarning"><span className="bwarning">1</span><b>Share</b></div>
                <div className="inner-wrap flexC cdark">
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
                    {actOpsiShare()}
                </div> 
                <div class="section cwarning"><span className="bwarning">2</span><b>Daftar Tujuan Form</b></div>
                <div class="button-section jcE">
                    <button className="btn bwarning">Simpan Perubahan</button> 
                </div>
            </form>
        </div>
       
    );
}