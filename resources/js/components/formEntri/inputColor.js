import React, {useState}   from "react";
function FEinputColor({ plac, resVal, dt, value='',clsSpan }) {
    const [val, _val] = useState();
    if(dt.star!=undefined && dt.star){  
        dt.star=false;
        if(value!=''){
            _val(value);
            resVal({
                value,
                dt 
            });
        }else{
            _val(0);
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
            <label>{plac}</label>
            <div className="iconInput2 jcSB">
                <input className="borderR10px"  type='color' style={{background:val}}  onChange={({target})=>selAct(target)}  />
                <span className={clsSpan}></span>
            </div>
        </div>
    )
}
export default FEinputColor;