 import React from "react"; 
import { useState } from 'react'; 

import { __listItemForView  } from "../../../utils/dataFormEntri";   
function FPentri({ dtf, saveNewData, updData, dvalue=[], batalkan }) {
    const [dnew,_dnew] = useState(dtf.data.map(v=>undefined)); 
    const act=({value,dt})=>{ 
        switch (dt.nameJudul) {
            case "select":
                return dnew[dt.indQ]=(dt.valueOption.filter((v,i)=>i==value.value).length == 2 ? 
                    { ...value,nameJudul:dt.nameJudul }:
                    {...value, dt:dt.valueOption[value.value][2],nameJudul:dt.nameJudul }
                ); 
            default: return dnew[dt.indQ]={label:value, nameJudul:dt.nameJudul}; 
        }
    };  
    if(dvalue.length>0 && dnew.length==0){ 
        _dnew(dvalue);
    }   
    const dformInput = __listItemForView({ act,dt:dtf.data,dvalue}); 
    return (
        <div className="boxShadow flexC w90p radius-10 pwrap__2p mwrap__2p mauto_">
            <div class="flexR">
                <button className="btn bdark">
                    <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                </button>
                <h2 className=" pwrap_5p pl0 cdark aiE fBebasNeue">{dtf.tujuan}</h2>
            </div> 
            <div className="flexC  pwrap_5p bwhite"> 
                <hr/> 
                {
                    dformInput.map((v,i)=>{
                        return v;
                    })
                } 
                <div style={{justifyContent:'end', display:'grid'}}  >
                    {
                        (
                            Object.keys(dvalue).length==0?
                            <button class="w200 btn bprimary " onClick={()=>saveNewData({dnew})}>Simpan Data</button> :
                            <div>
                                <button class="w200 btn bdark " onClick={()=>batalkan()}>Batalkan</button>
                                <button class="w200 btn bwarning cdark" onClick={()=>updData({dnew })}>Perbarui Data</button>
                            </div>  
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default FPentri;