import React, {useState}  from "react";
function FEinputCheckbox({ plac, resVal, dt, value=''}) {
    const [xdt, _xdt] = useState([]); 
    if(dt.star!=undefined && dt.star){  
        dt.star=false;
        if(value!=''){
            _xdt(value);
            resVal({
                value,
                dt 
            });
        }else{
            _xdt([]);
        }
    }  
    function selAct({value}, indC) { 
        const total = dt.valueOption[indC].length;
        const fdt = dt.valueOption[indC][total];
         
        if(xdt[indC]==undefined){
            xdt[indC] = {...dt.valueOption[indC], indC};
        }else{
            xdt[indC]=undefined;
        }
        const newDT = xdt.filter((v,i)=>v != undefined); 
        _xdt(newDT);
        resVal({
            value:newDT,
            dt 
        });
    } 
    return (
        <div className="doubleInput ptb10px">
                <label>{plac}</label>
                <div className="iconInputList jcSB">
                    {
                        dt.valueOption.map((v,i)=>{  
                            return (
                                <div className="flexR w100p aiC borderBInfo-1">
                                    <input className="borderR10px" checked={(xdt.filter(v=>v.indC == i).length>0 ? true:false )} type='checkbox' id={'check'+i} value={v[1]} name={v[0]} onChange={({target})=>selAct(target, i)}  />
                                    <label>{v[0]}</label>
                                </div>
                            )
                        })
                    }  
                </div>
            </div>
    )
}
export default FEinputCheckbox;