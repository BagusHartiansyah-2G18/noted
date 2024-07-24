import React from "react";
import FEinputLoop from "./inputLoop";
import { values } from "lodash";

function FaOption({ dt ,form, delAttrOption}){ 
    return dt.valueOption.map((v,i)=>{  
        return (
            <>
                <div className="flexR jcSB" >
                    <div className="aiE"><button class="w50 btn bdark ">{i+1}</button> </div>
                    <FEinputLoop key={"oi1"+i} dt={form.map((v1,i1)=>{  return {
                        ...v1, 
                        valuex:(
                            v[i1] !=undefined ? 
                                (v[i1].label==undefined ? v[i1]:v[i1].label)
                            :''
                        )
                    }})} sisipan={{i}}></FEinputLoop>
                    {(dt.valueOption.length !=1 ? 
                        <div className="aiE"><button class="w100 btn bdanger " onClick={()=>delAttrOption({indO:i})}><span className="mdi mdi-delete "></span></button> </div>:
                        ""
                    )}
                </div>
                <hr/>
            </>
        )
    });  
}
export default FaOption;