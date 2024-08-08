import React,{ useState } from "react";
import FScheckbox from "../../../formEntri/simpleComponen/FScheckbox"; 
export default function PPcatatan({ resVal, value, plac }) { 
    const jenisPublikasi = ["Catatan","Data Form Upload","Data Form Entri"];   
    value = Object.values(value);
    const dpCatatan = {
        xcatatan: (value.length==3? value[0]:0),
        xformUpload:  (value.length==3? value[1]:0),
        xformEntri:  (value.length==3? value[2]:0)
    }; 
    
    const respJenisP=(dt)=>{ 
        switch (dt.ind) {
            case 0: return dpCatatan.xcatatan = dt.checked;
            case 1: return dpCatatan.xformUpload = dt.checked;
            case 2: return dpCatatan.xformEntri = dt.checked;
        }  
    } 

    return(
       <>
            <label className="tbold fzXl">{plac}</label>
            <div class="gr_13"> 
            {
                jenisPublikasi.map((v,i)=>{
                    return <div className="pwrap-5">
                        <FScheckbox
                            callBack={respJenisP}
                            dt={{
                                plac:v,
                                ind:i,
                                value:value[i]
                            }}
                            start={{start:true}}
                            key={i}
                        ></FScheckbox>
                    </div>
                })
            } 
            </div>
            <hr/>
            <div class="button-section ">
                <button className="btn bwarning" onClick={()=>resVal(dpCatatan)}>Simpan Perubahan</button> 
            </div>
        </>
    )
}