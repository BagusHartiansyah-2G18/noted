import React, { useState } from "react"; 

function FEtextarea({ 
        resVal, plac, dt, valuex, clsDiv="doubleInput ptb10px borderB"}){
    const [val, _val] = useState(valuex);
    function selAct(data) { 
        resVal({value:data.target.value, dt});
        _val(data.target.value);
    }
    try {
        if(dt.star!=undefined && dt.star){ // digunakan untuk update awal, sesuai dengan value tersimpan 
            dt.star = false;  
            _val(valuex);
            resVal({
                value:valuex,
                dt 
            });
        }
    } catch (error) {
        // console.log(error); ada sebagaian item start tidak digunakan
    }
    return (
        <div className={clsDiv}>
            <label className="tbold pLink">{plac}</label>
            <div className="iconInput2">
                <textarea rows={dt.valueAttr[0]} className="radius-10 pwrap-10 w100p" cols={(dt.valueAttr[1])} value={val} onChange={selAct}></textarea>
            </div>
        </div> 
        
    )
}
export default FEtextarea;