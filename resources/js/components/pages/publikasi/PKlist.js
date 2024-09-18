import React, {useEffect, useState} from "react";
import Parser from 'html-react-parser';


export default function PKlist({ indOps, ringkasan}) {
    const [ onOff, _onOff ]=useState(1);
    const rows =ringkasan.toString().split("\n"); 
    const cRows = (ringkasan.length>25 ? 10:rows.length);

    useEffect(() => {
        _onOff(indOps==2);  
    }, []); 

    const actOnOff=({target})=>{  
        _onOff(target.checked); 
    } 
    const vhtml=()=>{
        return <>
            <div class="form-style-5 pm0 bwhite" style={{maxWidth:"unset"}}>
                <fieldset>
                    <legend className="jcSB">
                        <div>
                            <span class="number bdark">1</span>  <small>HTML</small>
                        </div>
                        <label className="w3-switch" style={{transform:"rotate(90deg)"}}>
                            <input type='checkbox' checked={onOff} onChange={actOnOff}></input>
                            <span className="slider"></span>
                        </label>
                    </legend>
                    <hr/> 
                    {(
                        onOff &&
                        <textarea rows={(cRows>10 ? 10:cRows )} className="bdark radius_10 pwrap-10 w100p" 
                            value={ringkasan}  
                        ></textarea> 
                    )} 
                </fieldset>
                <fieldset>
                    <legend><span class="number bdark">2</span> <small>Preview HTML</small></legend> 
                    {Parser(ringkasan)}
                    <hr/> 
                </fieldset> 
            </div> 
        </>
    }
    const vlist=()=>{ 
        return <div>
            <ol>
                {
                    rows.map(v=>{
                        return <li>{v}</li>
                    })
                }
            </ol>
        </div>
    }
    const vcss=()=>{ 
        return  <div class="form-style-5 pm0 bwhite" style={{maxWidth:"unset"}}>
        <fieldset>
            <legend className="jcSB">
                <div>
                    <span class="number bdark">1</span>  <small>CSS</small>
                </div>
                <label className="w3-switch" style={{transform:"rotate(90deg)"}}>
                    <input type='checkbox' checked={onOff} onChange={actOnOff}></input>
                    <span className="slider"></span>
                </label>
            </legend>
            <hr/> 
            {(
                onOff &&
                <textarea rows={(cRows>10 ? 10:cRows )} className="bdark radius_10 pwrap-10 w100p" 
                    value={ringkasan}  
                ></textarea> 
            )} 
        </fieldset> 
    </div>  
    }

    switch (indOps) {
        case 1:
            return vhtml();
        case 2:
            return vlist();
        case 3:
            return vcss();
        default: 
            return "";
    }  
}

