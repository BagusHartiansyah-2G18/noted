import React, {  useState,useEffect,useRef } from "react";
import { useInput } from '../../../hooks/useInput'; 
import Select from "react-select";  
import sfLib from "../../mfc/sfLib";
import Tabel1 from "../../../components/tabel/tabel1";
import { Link } from 'react-router-dom';
import { saveJSON } from "../../../states/sf/html/action"; 
 
import html2pdf from 'html2pdf.js';
import { unset } from "lodash";


export default function Pform({ option, tampilkan, start }) {
    const contentRef = useRef(null); 
    const [ cekTabel, _cekTabel ]=useState(0);
    const [ onOff, _onOff ]=useState(1);
    const [ selOps, _selOps ]=useState({});    

    const [search, _search] = useInput('');
    
    if(start.start){
        _cekTabel(0);
        _onOff(tampilkan); 
        _selOps({...option[0], dvalue:option[0].dvalue.map(v=>{ return [...JSON.parse(atob(v.data)),v.name]}) });  
        start.start =false;
    }
    // useEffect(() => {    
        
    //   }, []); 
    const actOnOff=({target})=>{  
        _onOff(target.checked); 
    } 
    const selAct=({label, value})=>{  
        // console.log({...option[value], dvalue:option[value].dvalue.map(v=>{ return [...JSON.parse(atob(v.data)),v.name]})});
        _selOps({...option[value], dvalue:option[value].dvalue.map(v=>{ return [...JSON.parse(atob(v.data)),v.name]})}); 
    } 
    if(Object.keys(selOps).length==0){
        return "";
    }
    const getTabel=()=>{
        const {data, dvalue}=selOps;
        const pertanyaan = data.map(v=>v.pertanyaan); 
        
        const max = 17;
        return [
            ...(pertanyaan.length>max? pertanyaan.slice(0,max):pertanyaan).map((v,i)=>{ 
            // ...pertanyaan.map((v,i)=>{ 
                return {
                    name: "["+(i+1)+"] "+v.substring(0,15),
                    selector: (row,i1) =>{
                        if(row[i] == null || row[i]== undefined){
                            return '*';
                        } 
                        if(typeof(row[i].label)=="object"){ //radio / select
                            if(typeof(row[i].label[0])=="object"){ //checkbox
                                let resp='';
                                row[i].label.forEach((v2,i2)=>{
                                    resp+=v2[0];
                                    if((i2+1)==row[i].label.length-1){
                                        resp+=` dan `;
                                    }else{
                                        if(i2!=row[i].label.length-1){
                                            resp+=`, `;
                                        }
                                    }
                                })
                                return resp;
                            }
                            return row[i].label[0];
                        }
                        return row[i].label;
                    },
                    // width : '200px'
                }
            })
        ]
    }   
    const prosesSaveJson=()=>{
        const {data, dvalue}=selOps;
        const pertanyaan = data.map(v=>v.pertanyaan); 

        saveJSON({col:pertanyaan, val:dvalue},selOps.label.replace(" ","-"))
    }

    const _excel = ()=>{  
        return sfLib.exportExcell({ 
            sheet ,
            colWidth ,
            data,
            header,
            keyObj
        })
    }
    const _pdf = () => {  
        const content = contentRef.current;  
		const options = {
			filename: sheet+'.pdf',
			margin: 1,
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: {
				unit: 'in',
				format: 'legal',
				orientation: (keyObj.length <6 ? 'portrait':'landscape'),
			},
		}; 
		html2pdf().set(options).from(content).save();
	};
    const keperluanExport=()=>{
        try {
            const {data, dvalue,label}=selOps;
            const header = [...data.map(v=>v.pertanyaan),"Penanggung Jawab"]; 
            const dataResp = [];
            dvalue.forEach((v,i)=>{
                const dataRespx = []; 
                v.forEach((v1,i1)=>{
                    if((v.length-1) == i1){
                        dataRespx[i1]=v1;
                    }else{
                        dataRespx[i1]=v1.label;
                    } 
                })
                dataResp[i]={...dataRespx}
            })
            
            const keyObj = dvalue[0].map((v,i)=>i);
            const rata2 = (100/keyObj.length).toFixed(); 
            // _cekTabel(1);
            return {
                sheet: sfLib.replaceMultipleChars(label,"?/",""),
                colWidth:keyObj.map(v=>rata2),
                data:dataResp,
                header,
                keyObj
            }
        } catch (error) {
            return {
                sheet: "",
                colWidth:[],
                data:[],
                header:[],
                keyObj:[]
            }
        }
    }
    if(Object.keys(selOps).length==0){
        return "";
    }
    const { sheet,colWidth,data,header,keyObj }= keperluanExport(); 
    // console.log(sheet);
    return (
        < > 
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
                        <b>{option.length} Form Entri</b>
                    </div> 
                </div>
                <Select
                    className="mnw400 pwrap-10"
                    options={sfLib.coptionLabelLength(option)}
                    placeholder={''}
                    value={selOps}
                    onChange={selAct}
                    isSearchable={true}
                /> 
            </div> 
            <div className="pwrap-10">
                <div className="flexR jcSB">
                    <div className='flexC ' style={{marginLeft:"10px"}}>
                        <label><b>Tujuan :</b></label>
                        <label>{selOps.label}</label>
                        <small className="cmuted">{selOps.tgl.substring(0,19)}</small>
                    </div>
                    {(
                        selOps.dvalue.length >0 &&
                        <div className="btnGroup  mwrap-5">
                            <button class="btn clight bdanger aiC tstart m0"   onClick={()=>_pdf()} title="Preview"> 
                                <span className="mdi mdi-file-pdf-box"></span> 
                                PDF
                            </button>
                            <button class="btn clight bsuccess m0" onClick={()=>_excel()} title="Form Upload"> 
                                <span className="mdi mdi-file-excel"></span>
                                Excel
                            </button>
                            <Link class="btn btn bprimary m0 aiC" onClick={()=>prosesSaveJson()}>
                                JSON
                            </Link> 
                        </div>
                    )}
                    
                </div> 
                <div className={`radius-10 `+(onOff?'scroll-600':'scroll-10 hidden')} style={{ 
                        // transform:"rotate(90deg)", 
                        padding:"0px 10px", 
                        borderTop:"1px solid #17a2b8",
                        // border.:"1px solid black"
                        }}>
                    <Tabel1 
                        search={(selOps.dvalue.length == 0?undefined:search)}
                        oncSearch={_search}
                        columns={getTabel()}
                        data={selOps.dvalue.filter((item) => {
                                if (search === "") {
                                    return item;
                                } else if (
                                    item.judul.toLowerCase().includes(search.toLowerCase()) || item.ringkasan.toLowerCase().includes(search.toLowerCase())
                                ) {
                                    return item;
                                }
                            })}
                    ></Tabel1>
                </div> 
            </div>  
            <div style={{visibility:"collapse"}}> 
                <div ref={contentRef} className="w100p tcenter">
                    <b ><u>{selOps.label}</u></b>
                    <br/>
                    <br/> 
                    <table className="w100p tblCollapse" border={1}>
                        <thead> 
                            <tr>
                                <th>No</th>
                                {
                                    header.map((v,i)=>{
                                        if(i!=header.length-1){
                                            return <th style={{width:colWidth[i]+"%"}}>{v}</th>
                                        }
                                        
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                        
                                {
                                    data.map((v,i)=>{  
                                        return (
                                            <tr> 
                                                <td >{i+1}</td>
                                                {
                                                    keyObj.map((v1,i1)=>{ 
                                                        if(i1!=keyObj.length-1){
                                                            return <td key={i+'.'+i1}>{v[v1]}</td>
                                                        }
                                                    })
                                                }
                                            </tr>
                                        ) 
                                    })
                                }
                                
                        </tbody>
                    </table>
                </div>
            </div> 
        </>
    )
}