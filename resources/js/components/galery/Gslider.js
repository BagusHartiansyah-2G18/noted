import React from "react";
import { useState } from 'react';

import Lbesic from "../list/lbesic";

function Gslider({ data }){
    if(data==undefined){
        return (<></>);
    }
    const [ ind, sind ]= useState(0);
    // const {img, judul, text, list} = ;

    const cekInd=(batas)=>{
        if(ind == batas){
            return false;
        }
        return true;
    }
    const prev=()=>{
        if(cekInd(0)){
            return sind(ind-1);
        }
        return sind(data.length-1);
    }
    const next=()=>{
        if(cekInd(data.length-1)){
            return sind(ind+1);
        }
        return sind(0);
    }

    return (
        <div className="sliderM">
            <button id="kiri" onClick={prev}><span className="mdi mdi-chevron-left-circle fzL1"></span></button>
            <div className="cimg jcE"><img src={data[ind].img} /></div>
            <div className="form blight08 pwrap-3p cdark">
                <h3 className="fBebasNeue tcenter ">{data[ind].judul}</h3>
                <p className="tjustify fzL">{data[ind].text}</p>
                {
                    (
                        data[ind].list!=undefined && data[ind].list.length>0 ?
                        <Lbesic data={data[ind].list}/>
                        :""
                    )
                }
            </div>
            <button id="kanan" onClick={next}><span className="mdi mdi-chevron-right-circle fzL1"></span></button>
        </div>
    )
}

export default Gslider;
