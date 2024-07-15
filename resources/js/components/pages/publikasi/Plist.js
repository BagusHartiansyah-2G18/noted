import React, { useState } from "react"; 
import Pform from "./Pform"; 
import Pfile from "./Pfile";
import PrenderHtml from "./PrenderHtml";
import Parser from 'html-react-parser';

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
        <div className={"flexC  borderForm pwrap-10 w80p "}>
            {
                dt.map((v,i)=>{
                    // console.log(openFile[i]);
                    const rows =v.ringkasan.toString().split("\n").length;  
                    return(
                        <>
                            <div key={i}>
                                <div className="flexR jcSB boxS pwrap-5 radius__10">
                                    <div className="flexC " style={{ alignSelf:"center"}}>
                                        <div className="flexR  " >
                                            <label className="aiC pwrap_10 cwarning tbold fzL3">{`[ `}<span className="fzXl cdark">{(i==0?tingkat:tingkat+"."+(i))}</span>{` ]`} </label>
                                            {(
                                                rows ==1 &&  v.ringkasan.length>3 ?
                                                <div style={{display:"flex", flexDirection:"column", alignSelf:"center"}}>
                                                    <span className="aiC fzL tbold">{v.judul}</span>
                                                    <small>{v.ringkasan}</small> 
                                                </div>:
                                                <span className="aiC fzL tbold">{v.judul}</span>
                                            )} 
                                        </div>
                                        <small className="pwrap_10 cmuted" style={{alignSelf:"baseline"}}>{v.created_at.substring(0,19)}</small> 
                                    </div>
                                    <div className="flexC">
                                        <div id="dropdonwUl_">
                                            <button class="dropdown-btn bdark">
                                                <span>Pengaturan</span>
                                                <span class="arrowTop"></span>
                                            </button>
                                            <ul class="dropdown-content dcTop bmuted pwrap-5p ">
                                                <li style={{"--delay": 2}}>
                                                    <button class="btn csuccess jcSA w100p" onClick={()=>{
                                                        window.open("localhost:9000")}
                                                        } >
                                                        <span className="mdi mdi-file-excel "></span>
                                                        <label>Export</label>
                                                    </button> 
                                                </li> 
                                                <li style={{"--delay": 2}}>
                                                    <button class="btn cwarning jcSA w100p"  >
                                                        <span className="mdi mdi-microsoft-sharepoint "></span>
                                                        <label>Bagikan</label>
                                                    </button>
                                                </li> 
                                                <li style={{"--delay": 2}}>
                                                    <button class="btn cprimary jcSA w100p"  >
                                                        <span className="mdi mdi-view-list-outline "></span>
                                                        <label>Form Entri</label>
                                                    </button>
                                                </li> 
                                                <li style={{"--delay": 1}} >
                                                    <button class="btn cinfo jcSA w100p"  >
                                                        <span className="mdi mdi-notebook-edit-outline "></span>
                                                        <label>Noted</label>
                                                    </button>
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
                                }} className="radius_10">
                                <br/>
                                {(
                                    rows > 1 &&
                                    <>
                                        <textarea rows={(rows>10 ? 10:rows )} onChange={()=>{}} className="bdark radius_10 pwrap-10 w100p" 
                                            value={v.ringkasan}  
                                        ></textarea> 
                                    </> 
                                )} 
                                {(
                                    v.judul.toLocaleLowerCase().split("(html)").length>=2 && 
                                    <div className="radius_10 pwrap-10 w100p"> 
                                        <label><b>* Preview HTML</b></label> 
                                        {Parser(v.ringkasan)}
                                        <hr/> 
                                    </div> 
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