import React, { useState } from "react"; 
import Pform from "./Pform"; 
import Pfile from "./Pfile";
// import PrenderHtml from "./PrenderHtml";
import PKlist from "./PKlist";
import { Link } from "react-router-dom";

function Plist({ dt, url, start}) {
    const tingkat = (dt[0].tingkat == 0? 1: dt[0].tingkat);
    const[openFile,_openFile] = useState();
    const[openForm,_openForm] = useState();
    
    if(start.start){ 
        _openFile(dt.map((v,i)=>(i==0 && v.file.length>0)));
        _openForm(dt.map((v,i)=>(i==0 && v.form.length>0)));
        start.start=false;
    }
    if(openFile == undefined || openForm == undefined){
        return '';
    }  
     
    return (
        <div className={"flexC  borderForm pwrap-10 w80p mauto"}>
            {
                dt.map((v,i)=>{  
                    const rows =v.ringkasan.toString().split("\n").length;  
                    return(
                        <>
                            <div key={i} >
                                <div className="flexR bwhite jcSB boxS pwrap-5 radius__10">
                                    <div className="flexC " style={{ alignSelf:"center"}}>
                                        <div className="flexR  " >
                                            <label className="aiC pwrap_10 cwarning tbold fzL3">{`[ `}<span className="fzXl cdark">{(i==0?tingkat:tingkat+"."+(i))}</span>{` ]`} </label>
                                            {(
                                                rows ==1 &&  v.ringkasan.length>3 ?
                                                <div style={{display:"flex", flexDirection:"column", alignSelf:"center"}}>
                                                    <span className="aiC fzL cdark tbold">{v.judul}</span>
                                                    <small className="cmuted">{v.ringkasan}</small> 
                                                </div>:
                                                <span className="aiC fzL cdark tbold">{v.judul}</span>
                                            )} 
                                        </div>
                                        <small className="pwrap_10 cmuted" style={{alignSelf:"baseline"}}>{v.created_at.substring(0,19)}</small> 
                                    </div>
                                    <div className="flexC " >
                                        <div id="dropdonwUl_">
                                            <button class="dropdown-btn bdark">
                                                <span>Pengaturan</span>
                                                <span class="arrowTop"></span>
                                            </button>
                                            <ul class="dropdown-content dcTop bmuted pwrap-5p ">
                                                
                                                <li style={{"--delay": 2}}>
                                                    <Link class="btn csuccess  w100p jcSA" style={{display:"flex"}}  target="_blank" 
                                                        to={'/pe-export/'+btoa(JSON.stringify({
                                                            kdJudul:v.kdJudul,
                                                            kdMember:v.kdMember,
                                                            tingkat:v.tingkat 
                                                        }))}  title="Preview">
                                                        <span className="mdi mdi-file-excel"></span>
                                                        <label>Export</label>
                                                    </Link> 
                                                </li> 
                                                <li style={{"--delay": 2}}> 
                                                    <Link class="btn cprimary  w100p jcSA" style={{display:"flex"}}  target="_blank" 
                                                        to={'/pe-formentri/'+btoa(JSON.stringify({
                                                            kdJudul:v.kdJudul,
                                                            kdMember:v.kdMember,
                                                            tingkat:v.tingkat 
                                                        }))}  title="Preview">
                                                        <span className="mdi mdi-view-list-outline "></span>
                                                        <label>Form Entri</label>
                                                    </Link>
                                                </li> 
                                                <li style={{"--delay": 1}} >
                                                
                                                    <Link class="btn cinfo  w100p jcSA" style={{display:"flex"}}  target="_blank" 
                                                        to={'/pe-noted/'+btoa(JSON.stringify({
                                                            kdJudul:v.kdJudul,
                                                            kdMember:v.kdMember,
                                                            tingkat:v.tingkat 
                                                        }))}  title="Preview">
                                                        <span className="mdi mdi-notebook-edit-outline "></span>
                                                        <label>Noted</label>
                                                    </Link>
                                                </li>
                                                 
                                            </ul>
                                        </div> 
                                        <div className="btnGroup pwrap-5" style={{alignSelf:"baseline"}}>
                                            <button class="btn  cmuted pwrap_5">
                                                <span className="mdi mdi-folder-file"></span>
                                                {` ${v.file.length} File`} 
                                            </button>
                                            <button class="btn  cmuted pm0">
                                                <span className="mdi mdi-view-list-outline"></span>
                                                {` ${v.form.length} Form Entri`} 
                                            </button> 
                                        </div>
                                    </div>
                                </div>  
                            </div>
                            <div style={{   
                                    border:"1px solid #17a2b8", 
                                    marginBottom:"5px"
                                }} 
                                className="radius_10 blight">
                                <br/> 
                                {(
                                    v.indOps>0 ? 
                                    <div className="radius_10 pwrap-10 w100p flexC"> 
                                        <PKlist 
                                            indOps={v.indOps}
                                            ringkasan={v.ringkasan}
                                        ></PKlist>
                                    </div>:
                                    (
                                        rows > 1 &&
                                        <>
                                            <textarea rows={(rows>10 ? 10:rows )} onChange={()=>{}} className="bdark radius_10 pwrap-10 w100p" 
                                                value={v.ringkasan}  
                                            ></textarea> 
                                        </> 
                                    )
                                )}  
                                {(
                                    v.file.length>0 &&
                                    <Pfile
                                        option={v.file.map(v=>{ 
                                            return {
                                                value:(v.url=='-'? url+'storage/'+v.file:v.url),
                                                label:v.keterangan
                                            }
                                        })}
                                        tampilkan={openForm[i]}
                                    ></Pfile> 
                                )}
                                {(  v.form.length>0 &&
                                    <Pform  
                                        option={v.form.map((v,i)=>{  
                                            return {
                                                value:i,
                                                label:v.tujuan,
                                                data:JSON.parse(atob(v.data)),
                                                dvalue:v.dvalue,
                                                tgl:v.created_at
                                            }
                                        })}
                                        tampilkan={openForm[i]}
                                        start={{start:true}}
                                    ></Pform>
                                )} 
                            </div>
                        </>
                    )
                })
            }
            
            
        </div>
    );
}
export default Plist;  