import React from "react";
import Tabel1 from "../../../components/tabel/tabel1";
import { useInput } from '../../../hooks/useInput';
import { saveJSON } from "../../../states/sf/html/action";

function FPtabelData({ dt, pertanyaan, user, updData,delData, tujuan, kdDF }) { 
    const [search, _search] = useInput('');  
    const coll = [
        ...pertanyaan.slice(0,2).map((v,i)=>{ 
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
        }),
        {
            name: "["+(pertanyaan.length+1)+"] Penjawab",
            selector: (row,i1) => row[row.length-1], 
        },{
            cell:(row,i) =>collBtn(row,i),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '250px',
            name:"Action"
        }
    ]; 
    const prosesSaveJson=()=>{
        saveJSON({
            col:pertanyaan,
            val:dt
        },tujuan.replace(" ","-"))
    }
    const collBtn=(row)=>{    
        return(
            <div className="btnGroup blight">
                {
                    (user?
                        <button class="btn bdanger" onClick={()=>delData(row[row.length-1])} title="Hapus">
                            <span className="mdi mdi-delete"></span>  
                        </button>
                        :''
                    )
                } 
                <button class="btn bwarning" onClick={()=>updData(row[row.length-1])} title="Perbarui">
                    <span className="mdi mdi-lead-pencil"></span>  
                </button> 
            </div>
        )
    }   
    
    return ( 
        <div class="FM1 borderForm  w80p mauto">
            <div class="header bwhite">
                <div class="cdark flexR">
                    <button className="btn bdark">
                        <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                    </button>
                    <h2 className="  pl0 aiE fBebasNeue">
                        <b>List Data {` { `+kdDF+` }`}</b> 
                    </h2>
                </div> 
                <button class="ptb10px btn bsuccess " onClick={()=>prosesSaveJson()}>go JSON</button> 
            </div>
            <div class="body bdark pm0" style={{width:"unset"}}> 
                <div>
                    <Tabel1
                        search={search}
                        oncSearch={_search}
                        columns={coll}
                        data={dt.filter((item) => {  
                            if (search === "") {
                                return item;
                            } else if ( 
                                item[0].label.toLowerCase().includes(search.toLowerCase())
                            ) { 
                                return item;
                            }  
                        })}
                        dbtn={[
                            {label:"Hapus Data",value:"bdanger"},
                            {label:"Perbarui Data",value:"bwarning"},
                        ]}
                    ></Tabel1>
                </div>
            </div>
        </div> 
    )
}
export default FPtabelData;