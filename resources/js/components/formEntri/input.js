import React, {useState} from "react";

import FEinputCheckbox from './inputCheckbox';
import FEinputColor from './inputColor';
import FEinputFile from './inputFile';
import FEinputRadio from './inputRadio';
import FEinputRange from './inputRange';

function FEinput({
            resVal, plac, dt, types="text",
            clsSpan="mdi mdi-emoticon-angry ", placd="...",
            valuex 
        }){
    const [val, _val] = useState(valuex);
    function selAct({value}) { 
        _val(value);
        resVal({
            value,
            dt 
        });
    }  
    
    switch (dt.name) {
        case "file": return <FEinputFile 
            resVal={resVal}
            plac={plac}
            dt={dt}
            value={valuex}
        ></FEinputFile>;
        case "range": return <FEinputRange 
            resVal={resVal}
            plac={plac}
            dt={dt}
            value={valuex}
        ></FEinputRange>;
        case "color": return <FEinputColor 
            resVal={resVal}
            plac={plac}
            dt={dt}
            value={valuex}
            clsSpan={clsSpan}
        ></FEinputColor>;
        case "checkbox": return <FEinputCheckbox 
            resVal={resVal}
            plac={plac}
            dt={dt}
            value={valuex} 
        ></FEinputCheckbox>;
        case "radio": return <FEinputRadio 
            resVal={resVal}
            plac={plac}
            dt={dt}
            value={valuex} 
        ></FEinputRadio>; 
    }
    if(dt.star!=undefined && dt.star){ // digunakan untuk update awal, sesuai dengan value tersimpan 
        _val((valuex==undefined ? '':valuex));
        resVal({
            value:valuex,
            dt 
        });
        dt.star = false; 
    }
    return ( 
        <div className="doubleInput ptb10px">
            <label>{plac}</label>
            <div className="iconInput2 ">
                <input className="borderR10px" type={types} value={val} onChange={({target})=>selAct(target)} placeholder={placd} />
                <span className={clsSpan}></span>
            </div>
        </div>
    )
}
export default FEinput;