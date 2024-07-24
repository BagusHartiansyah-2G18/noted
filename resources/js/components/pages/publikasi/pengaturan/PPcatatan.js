import React from "react";
import FScheckbox from "../../../formEntri/simpleComponen/FScheckbox"; 
export default function PPcatatan({ resVal }) { 
    const jenisPublikasi = ["Catatan","Data Form Upload","Data Form Entri"];
    const respJenisP=(dt)=>{
        console.log(dt);
    }
    return(
        <div class="inner-wrap gr_13">  
            {
                jenisPublikasi.map((v,i)=>{
                    return <div className="pwrap-5">
                        <FScheckbox
                            callBack={respJenisP}
                            dt={{
                                plac:v,
                                ind:i,
                                value:undefined
                            }}
                            start={{start:true}}
                            key={i}
                        ></FScheckbox>
                    </div>
                })
            } 
        </div>
    )
}