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
          width : '200px'
        }
        ,{
            name: 'Jenis Form',
            selector: row =>row.nameJudul+", "+row.name,
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
            <div className="btnGroup blight">
                <button class="btn cdanger" onClick={()=>delTypeFormSelected(i)} title="Hapus">
                    <span className="mdi mdi-file-settings"></span> Hapus
                </button>
                <button class="btn cinfo" onClick={()=>aturSettingV({v:row, i})} title="setting">
                    <span className="mdi mdi-file-settings"></span> Pengaturan
                </button> 
            </div>
        )
    }  
    return (
       <> 
            <div className="flexC  pwrap_5p bwhite">
                <div className="flexC jcSB borderForm pwrap-10">
                    <div className="flexR">
                        <label className="aiC pwrap_10 cwarning tbold fzL3">{`[ `}<span className="fzXl cdark">1.</span>{` ]`} </label>
                        <label className="aiC fzL">Pemilihan JeniS Form </label>
                    </div> 
                    <hr/>
                    <div className="flexR">
                        <div className="doubleInput ptb10px pwrap_2p">
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

                        <div className="doubleInput ptb10px">
                                <label className="mw100px"><span className={`mdi mdi-file-upload cprimary fziconS`}></span>Keterangan Form</label>
                                <label>{(Object.keys(dtForm).length==0 ?'Belum ada informasi !':dtForm.alt)}</label>
                        </div> 
                        {
                            (Object.keys(dtForm).length>0 && dtForm.ops.length>1
                                && 
                                <>
                                    <div className="doubleInput ptb10px">
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
                    </div> 
                    <div style={{justifyContent:'end', display:'grid'}}  >
                        {
                            (indF>=0 &&
                                <button class="w200 btn bprimary " onClick={()=>PilihJenisForm({indF, indO})}>Pilih Jenis Form ini</button> 
                            )
                        }
                        
                    </div>                    
                </div>
                <br/>
                <div className="flexC jcSB borderForm pwrap-10">
                    <div className="flexR">
                        <label className="aiC pwrap_10 cwarning tbold fzL3">{`[ `}<span className="fzXl cdark">2.</span>{` ]`} </label>
                        <label className="aiC fzL">Daftar Form Terpilih </label>
                    </div>
                    <hr/>
                    {
                        (deData.length>0 &&
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
                            ></Tabel1>
                        )
                    }
                </div> 
            </div> 
       </> 
    )
}
export default FEDjenisForm; 