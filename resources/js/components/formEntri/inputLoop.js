import React from "react";
import FEinput from "./input";

function FEinputLoop({
        dt, sisipan={nul:0}
    }){ 
    return dt.map((v,i)=>{
        return (
            <FEinput
                key={i}
                plac={v.plac}
                types={v.type}
                resVal={v.func}
                clsSpan={v.clsSpan}
                valuex={v.valuex}
                // valuex={dt.ops.value}
                dt={{...v, ...sisipan}}
            ></FEinput>
        )
    })
}
export default FEinputLoop;