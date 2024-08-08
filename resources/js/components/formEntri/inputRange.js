import React, {useState}  from "react";
function FEinputRange({ plac, resVal, dt, value='' }) {
    const [val, _val] = useState();
    const valAttr = dt.valueAttr;
    if(dt.star!=undefined && dt.star){  
        dt.star=false;
        if(value!=''){
            _val(value);
            resVal({
                value,
                dt 
            });
        }else{
            _val(valAttr[3]);
        }
    } 
    function selAct({value}) {  
        _val(value);
        resVal({
            value,
            dt 
        });
    }  
    
    return (
        <div className="doubleInput ptb10px">
                <label>{plac} {`( ${val} )`}</label>
                <div className="iconInput2 ">
                    <label>{valAttr[3]}</label>
                    <input type='range' value={val} min={valAttr[3]} max={valAttr[2]} onChange={({target})=>selAct(target)} /> 
                    <label>{valAttr[2]}</label>
                </div>
            </div>
    )
}
export default FEinputRange;