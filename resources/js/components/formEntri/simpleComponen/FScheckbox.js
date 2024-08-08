import React,{ useState }  from "react";
export default function FScheckbox({ dt, callBack ,start }){
    // {plac: 'Catatan', ind: 0, value: undefined}  
    const [ onOff, _onOff ]=useState(0);
    const actOnOff=({target})=>{  
        _onOff(target.checked); 
        callBack({
            ...dt,
            checked:target.checked
        });
    }
    if(start.start){
        start.start = false;
        _onOff((dt.value!=undefined ? dt.value: 0));
    }
    return <>
        <input type='checkbox' checked={onOff} onChange={actOnOff}></input> {dt.plac}
    </>
}