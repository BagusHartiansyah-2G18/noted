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
    const collBtn=(row, i)=>{   
        return(
            <div className="btnGroup blight">
                {
                    (user?
                        <button class="btn bdanger" onClick={()=>delData(i)} title="Hapus">
                            <span className="mdi mdi-file-settings"></span> Hapus
                        </button>
                        :''
                    )
                } 
                <button class="btn bwarning" onClick={()=>updData(i)} title="Perbarui">
                    <span className="mdi mdi-file-settings"></span> Perbarui
                </button> 
            </div>
        )
    }  
    return ( 
        <div className="boxShadow flexC w90p radius-10 pwrap__2p mwrap__2p mauto_">
            <div className="flexR jcSB">
                <div class="w50p flexR">
                    <button className="btn bdark">
                        <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                    </button>
                    <h2 className=" pwrap_5p pl0 cdark aiE fBebasNeue">List Data {` { `+kdDF+` }`}</h2>
                </div>  
                <button class="ptb10px btn bsuccess " onClick={()=>prosesSaveJson()}>go JSON</button> 
            </div> 
            <div className="flexC  pwrap_5p bwhite"> 
                <hr/> 
                <Tabel1
                    search={search}
                    oncSearch={_search}
                    columns={coll}
                    data={dt.filter((item) => {
                            if (search === "") {
                                return item;
                            } else if (
                                item.toLowerCase().includes(search.toLowerCase())
                            ) {
                                return item;
                            }
                        })}
                ></Tabel1>
                <hr/> 
            </div>
        </div>
    )
}
export default FPtabelData;