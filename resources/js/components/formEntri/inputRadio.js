import React, {useState} from "react";
function FEinputRadio({ plac, resVal, dt, value=''}) {
    const [val, _val] = useState();  
    if(dt.star!=undefined && dt.star){  
        dt.star=false;
        if(value!=''){
            _val(value[1]);
            resVal({
                value,
                dt 
            });
        }else{
            _val(-1);
        }
    }  
    function selAct({value}, indC) { 
        _val(value); 
        resVal({
            value:dt.valueOption[indC],
            dt 
        });
    } 
    return (
        <div className="doubleInput ptb10px">
            <label>{plac}</label>
            <div className="iconInputList  jcSB">
                {
                    dt.valueOption.map((v,i)=>{  
                        return (
                            <div className="flexR aiC w100p borderBInfo-1">
                                <input className="borderR10px " checked={(val == v[1] ? true:false )} type='radio' id={'radios'+i} value={v[1]} name={v[0]} onChange={({target})=>selAct(target, i)}  />
                                <label>{v[0]}</label> 
                            </div>
                        )
                    })
                }  
            </div>
        </div>
    )
}
export default FEinputRadio;
