import React, {useState}  from "react";
 
import sfLib from '../mfc/sfLib';
import { uploadFile,fileUrl } from '../../states/sf/html/action';

function FEinputFile({ plac, resVal, dt, value='' }) {
    const [val, _val] = useState();
    const [url, _url] = useState();  
    if(dt.star!=undefined && dt.star){  
        dt.star=false;
        if(value!=''){
            _url({ nama:value, url:fileUrl(value) });
            resVal({
                value:value,
                dt 
            });
        }else{
            _url(undefined);
            _val(undefined);
        }
        
    }
    const execute=({ nama, url })=>{
        _url({ nama, url });
        _val(undefined);
        resVal({
            value:nama,
            dt 
        });
    }
    const upload=()=>{ 
        uploadFile({files:val},execute);
    } 
    const viewFile=()=>{
        return(
            <div className="flexC">
                <label>File Terupload</label>
                <a href={url.url} target="_blank">{url.nama}</a>
            </div>
        )
    }
    const viewSelected=()=>{
        return(
            <div className="flexC">
                <label>File Terpilih</label>
                <label>{val.nama}</label>
            </div>
        )
    } 
    return (
        <div className="doubleInput ptb10px">
            <label>{plac}</label>
            <div className="List3  jcSB">
                <input type='file' value={''}  onChange={(e)=>sfLib.readFile(e.target,_val)}  /> 
                {(
                    url!=undefined && val==undefined  ?
                    viewFile():(val!=undefined? viewSelected():'')
                )}
                {(
                    val!=undefined?
                    <button id="btnUpload" className="btn bsuccess" onClick={upload}>Upload</button>:''
                )}
            </div>
        </div>
    )
}
export default FEinputFile;