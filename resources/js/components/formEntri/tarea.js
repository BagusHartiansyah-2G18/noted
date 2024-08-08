import React from "react";

function tarea({
        resVal, plac, dt,cols=10,rows=4,
        valuex
    }) {
    const [val, _val] = useInput(valuex);
    function selAct(value) {
        resVal({
            value,
            dt
        });
        _val(value);
    }
    return (
        <div className="doubleInput ptb10px">
            <label>{plac}</label>
            <div className="iconInput2 ">  
                <textarea rows={rows} cols={cols} className="borderR10px pwrap w100p" value={val} onChange={selAct}></textarea> 
            </div>
        </div>
        
    );

}
export default tarea;