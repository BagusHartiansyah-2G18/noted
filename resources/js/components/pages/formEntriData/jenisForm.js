import React, { useState } from "react"; 

import FEselect from "../../../components/formEntri/select";
import sfLib from '../../../components/mfc/sfLib';
import Tabel1 from "../../../components/tabel/tabel1";
import { useInput } from '../../../hooks/useInput';



import {__cbForm, __opsForm, __selectform, __infoListTerpilih } from "../../../utils/dataFormEntri";

function FEDjenisForm({ indS, PilihJenisForm, deData, delTypeFormSelected,aturSettingV }) {
    const[indF,_indF]  = useState(-1);
    const [indO, _indO] = useState(0);
    const[dtForm,_dtForm]  = useState({});
    const [search, _search] = useInput(''); 

    const prosesJenisForm = ({ value, indx}) =>{   
        const {ind,dfObj} = __selectform({data:value});   
        _indF(ind);
        _indO(0);
        _dtForm(dfObj);   
    }
    const prosesFormOption = ({ value:data, indx}) =>{
        const ind = dtForm.ops.findIndex((val)=>val.name == data.label);
        _indO(ind); 
    } 

    const colFormSelected = [
        {
          name: 'No',
          selector: (row,i) => i+1,
          width : '50px'
        }
        ,{
            name: 'Jenis Form',
            selector: row =>row.nameJudul+", "+row.name,
            width : '150px'
        },{
            name: 'Pertanyaan',
            selector: row => row.pertanyaan,
        },{
            cell:(row,i) =>vjudulbtn(row,i),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '250px'
        }
    ]; 
    const vjudulbtn=(row, i)=>{   
        return(
            <div className="btnGroup clight">
                <button class="btn bdanger" onClick={()=>delTypeFormSelected(i)} title="Hapus">
                    <span className="mdi mdi-delete"></span> 
                </button>
                <button class="btn binfo" onClick={()=>aturSettingV({v:row, i})} title="setting">
                    <span className="mdi mdi-file-check"></span>
                </button> 
            </div>
        )
    }  
    return (
        <> 
        <div className="right">
            <div class="FM1">
                <div class="header bwhite">
                    <div class="cdark flexR">
                        <button className="btn bdark">
                            <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                        </button>
                        <h2 className="  pl0 aiE fBebasNeue">
                            <b>Pemilihan JeniS Form</b> 
                        </h2>
                    </div> 
                </div>
                <div class="body bdark pwrap-5" style={{width:"unset" }}> 
                    <div className="doubleInput pwrap-2p bsolid1 cinfo">
                        <label>Daftar Jenis Form </label>
                        <div className="iconInput2 ">
                            <FEselect
                                option={__cbForm()}
                                // indx={indx}
                                getVal={{label:"Pilih Type Form yang akan digunakan", value:0}}
                                resVal={prosesJenisForm} 
                            ></FEselect>
                        </div>
                    </div>

                    <div className="doubleInput pwrap-2p bsolid1 cinfo">
                            <label className="mw100px"><span className={`mdi mdi-file-upload cprimary fziconS`}></span>Keterangan Form</label>
                            <label>{(Object.keys(dtForm).length==0 ?'Belum ada informasi !':dtForm.alt)}</label>
                    </div> 
                    {
                        (Object.keys(dtForm).length>0 && dtForm.ops.length>1
                            && 
                            <>
                                <div className="doubleInput pwrap-2p bsolid1 cinfo">
                                    <label className="w200">Jenis {dtForm.name}</label>
                                    <FEselect
                                        option={sfLib.coptionSelect({
                                            dt:dtForm.ops,
                                            row:{label:'name',value:'name'},
                                            // xind:true
                                        })}
                                        // indx={indx}
                                        getVal={{label:dtForm.ops[0].name, value:dtForm.ops[0].name}}
                                        resVal={prosesFormOption} 
                                    ></FEselect>
                                </div> 
                            </>
                        )
                    }
                    <div style={{justifyContent:'end', display:'grid'}}  >
                        {
                            (indF>=0 &&
                                <button class="w200 btn bprimary " onClick={()=>PilihJenisForm({indF, indO})}>Pilih Jenis Form ini</button> 
                            )
                        }
                        
                    </div>  
                </div>
            </div>
        </div>
        <div className="left" > 
            <div class="FM1">
                <div class="header bwhite">
                    <div class="cdark flexR">
                        <button className="btn bdark">
                            <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                        </button>
                        <h2 className="  pl0 aiE fBebasNeue">
                            <b>Daftar JeniS Form Terpilih</b> 
                        </h2>
                    </div> 
                </div>
                <div class="body bdark" style={{width:"unset" }}> 
                    {
                        (deData.length>0 &&
                            <div>
                                <Tabel1
                                    search={search}
                                    oncSearch={_search}
                                    columns={colFormSelected}
                                    data={__infoListTerpilih(deData).filter((item) => {
                                            if (search === "") {
                                                return item;
                                            } else if (
                                                item.name.toLowerCase().includes(search.toLowerCase())
                                            ) {
                                                return item;
                                            }
                                        })}
                                    dbtn={[
                                        {label:"Hapus",value:"bdanger"},
                                        {label:"Pengaturan Jenis Form",value:"binfo"}
                                    ]}
                                ></Tabel1>
                            </div>
                        )
                    }
                </div>
            </div> 
        </div> 
       </>  
    )
}
export default FEDjenisForm; 