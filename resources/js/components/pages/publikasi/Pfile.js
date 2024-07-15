import React , {  useEffect, useState } from "react"
import PVpdf from "../../pdfviewer/PVcomponen";
import Select from "react-select";  
import { Link } from 'react-router-dom';

export default function Pfile({ option, tampilkan }) {
    const [ onOff, _onOff ]=useState(1);
    const [ files, _files ]=useState({});
    useEffect(() => {
        _onOff(tampilkan); 
        _files({label:option[0].label,value:option[0].value});  
    }, []); 
    if(Object.keys(files).length == 0 ){
        return "";
    }
    let ektensi = false;
    try {
        const csplit = (files.value).split('.');  
        if(csplit.length>1){
            ektensi = csplit[csplit.length-1].toLocaleLowerCase();
        }  
    } catch (error) { 
    }  

    const actOnOff=({target})=>{  
        _onOff(target.checked); 
    } 
    const selAct=({label, value})=>{    
        _files({label, value}); 
    }  
    return (
    <>
       <div className='flexR jcSB boxS pwrap_20'>
          <div className='flexR'> 
              <div class=" cdark pwrap-2p aiC radius-10" 
                  style={{ 
                  // transform:"rotate(90deg)", 
                  padding:"0px 10px", 
                  // borderLeft:"1px solid black",
                  // borderRight:"1px solid black"
                  }}>
                  <label className="w3-switch" style={{transform:"rotate(90deg)"}}>
                      <input type='checkbox' checked={onOff} onChange={actOnOff}></input>
                      <span className="slider round"></span>
                  </label>
                  <b>{option.length} File</b>
              </div> 
          </div>
          <Select
              className="mnw400 pwrap-10"
              options={option}
              placeholder={''}
              value={files}
              onChange={selAct}
              isSearchable={true}
          /> 
      </div>
      <div className="pwrap-10">
        <div className='flexC' style={{marginLeft:"10px"}}>
            <label><b>Nama File :</b></label>
            <Link class="cprimary" onClick={()=>{window.open(files.value)}} target="_blank" title="Akses File"> 
                <span className="mdi mdi-web"></span> 
                <label className="pwrap-5">{files.label}</label>
            </Link> 
        </div>
        <hr/>
        {(
            ektensi=="pdf" && 
            <PVpdf onOff={onOff} start={{start:true}} initialDoc={files.value}></PVpdf>
        )}
      </div>  
    </>
    )
}