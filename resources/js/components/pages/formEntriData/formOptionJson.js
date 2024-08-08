import React,{useState} from "react";
import sfLib from "../../../components//mfc/sfLib";
import FEselect from "../../formEntri/select";

function FormOptionJson({saveImportOptionJson}) {
    const [dtx, _dtx] = useState({});
    let hasil = [];
    const prosesCBSelected=({ value:data, dt})=>{ 
        hasil[dt.indx]=data.value; 
    }
    if(Object.keys(dtx).length>0){ 
        hasil = dtx.col.map((v,i)=>0);
    }  
    return (
        <div className="flexC">
            <div className="flexR jcSB ptb10px">
                <label className="mw100px"><span className={`mdi mdi-file-upload cprimary fziconS`}></span>File JSON</label>
                <input className="borderR10px" type="file" value=''
                    onChange={(e)=>sfLib.readJson(e.target,_dtx)} />
            </div>
            
            {
                (
                    Object.keys(dtx).length>0 &&
                    <>
                        <hr/>
                        <label><h3 style={{display:"inline"}}>#.</h3>Pilih Kolom yang Akan Menjadi :</label>
                        {
                            ["Label","Value"].map((v,i)=>{
                                return (
                                    <>
                                        <hr/>
                                        <div className="flexR jcSB" >
                                            <div className="aiE">{v}</div>
                                            <FEselect 
                                                option={sfLib.valueCB({ dt:dtx.col, xind:true})}  
                                                getVal={{label:dtx.col[0], value:0}}
                                                dt={{indx:i}}
                                                resVal={prosesCBSelected} >    
                                            </FEselect>
                                                
                                        </div> 
                                    </>
                                )
                            })
                        }
                    </>
                )
            }
            <hr/>
            <div className="flexR jcSB">
                <label></label>
                <button className="btn bprimary" onClick={()=>saveImportOptionJson({...dtx,select:hasil})}> Import JSON</button>
            </div>
        </div>
    )
}
export default FormOptionJson;