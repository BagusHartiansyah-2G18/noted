import React, { useState } from "react";
import Select from "react-select";  

function FEselect({ option, resVal, plac, getVal = {}, dt, clsDiv="doubleInput ptb10px"}){
    const [val, _val] = useState({});
    function selAct(data) {
        resVal({value:data, dt});
        _val(data);
    } 
    try {
        if(dt.star!=undefined && dt.star){ // digunakan untuk update awal, sesuai dengan value tersimpan
            dt.star = false;
            _val({ label: getVal.label, value: getVal.value});
            resVal({value:{ label: getVal.label, value: getVal.value}, dt}); 
        }
    } catch (error) {
        // console.log(error); ada sebagaian item start tidak digunakan
    }
    return (
        <div className={clsDiv}>
            <label className="tbold pLink">{plac}</label>
            <Select
                className="mnw400 cdark blight"
                options={option}
                placeholder={plac}
                value={val}
                onChange={selAct}
                isSearchable={true}
            />
        </div>
        
    )
}
export default FEselect;