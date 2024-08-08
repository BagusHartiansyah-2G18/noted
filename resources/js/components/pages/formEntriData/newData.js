import React, { useState,useRef } from "react";
import { Link, useParams } from 'react-router-dom';


import Tabel1 from "../../tabel/tabel1";
import { __tahapan } from '../../../utils/dataFormEntri';
import { useInput } from '../../../hooks/useInput'; 
// import { __KdDF } from "../../../states/formEntri/action";

function FEDnewData({ buatFormBaru, dbForm, pilihTypeForm, keyDB,formPerbaruiTujuan}) {
    const [form, _form] = useState({
        on : 0,
        add : 1
    }); 
    const [tujuan, _tujuan] = useInput();
    const tujuanFokus = useRef(null);

    const col = [
        {
          name: 'No',
          selector: row => row.kd,
          width : '50px'
        }
        ,{
            name: 'Tujuan / Keperluan',
            selector: row =><>
                <b>{row.tujuan}</b><br/> ditahapan {__tahapan(row.tahapan)} 
                {/* <br/><br/><b>{__KdDF({ ...keyDB(),kdForm:row.kd })}</b> */}
            </>,
        },
        // {
        //     name: 'tahapan',
        //     selector: (row,i) =>
        // },
        {
            name: 'Aksi Tombol',
            selector: (row,i) =>colBtn(row,i),
            width: "250px"
        } 
    ];
    const perbarui=({i,ftujuan})=>{
        _tujuan({target:{value:ftujuan}});
        _form({on:1, add:0, indU:i});
    }
    const formPerbaruiTujuanx=(v)=>{
        formPerbaruiTujuan(v);
        _form({on:0, add:1, indU:-1});
    }
    const buatFormBarux=(v)=>{
        buatFormBaru(v);
        _form({on:0, add:1});
    }
    const colBtn=(row,i)=>{
        //row.status terkunci atau sudah selesai tahapan penyetingan form / berdata
        return(
            <div className="btnGroup blight">
                <button class="btn bwarning" onClick={()=>perbarui({i,ftujuan:row.tujuan})} title="Perbarui">
                    <span className="mdi mdi-pencil"></span> 
                </button>
                <button class="btn binfo" onClick={()=>pilihTypeForm(i)} title="Pilih Jenis Form">
                    <span className="mdi mdi-file-check"></span> 
                </button>
                <Link class="btn bsuccess" target="_blank"  to={'/formPreview/'+btoa(JSON.stringify({...keyDB(),kdForm:row.kd}))} title="preview Form"> 
                    <span className="mdi mdi-search-web"></span> 
                </Link> 
            </div>
        )
    }

    const openFormBaru=()=>{
        _form({...form, add:true, on:1});
        _tujuan({target:{value:''}});
    }
    const closeFormBaru=()=>{
        _form({...form, on:0})
    }
    return (
        <div class="FM1">
            <div class="header bwhite">
                <div class="cdark flexR">
                    <button className="btn bdark">
                        <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                    </button>
                    <h2 className="  pl0 aiE fBebasNeue">
                        <b>Pembuatan Form</b> 
                    </h2>
                </div> 
                {
                    form.on ? 
                    <button class="ptb10px btn bdanger " onClick={()=>closeFormBaru()}>Close Form</button> :
                    <button class="ptb10px btn bprimary " onClick={()=>openFormBaru()}>Buat Form Baru</button> 
                }
            </div>
            <div class="body bdark" style={{width:"unset" }}> 
                {
                    (form.on ? 
                        <div className="borderForm pwrap-10">
                            <u className="cinfo"><label className="aiC pwrap_10  tbold fzL3">{`[  `}<span className="fzXl pwrap_5 cwhite">Penambahan Data Baru</span>{`]`} </label></u>
                            {/* <hr/> */}
                            <div className="doubleInput ptb10px">
                                <label>Tujuan</label>
                                <div className="iconInput2 ">
                                    <input className="borderR10px" ref={tujuanFokus}  type="text" value={tujuan} onChange={_tujuan} placeholder="pendataan warga ..." />
                                    <span className={`mdi mdi-lightbulb-on ${(form.add == 1 ? 'cprimary': 'cwarning')} `}></span>
                                </div>
                            </div> 
                            <div>
                                {
                                    (
                                        form.add == 1 ?
                                            <button class="btn bprimary" onClick={()=>buatFormBarux({ tujuan })}>Buatkan Form Baru</button>
                                        :
                                            <button class="btn bwarning" onClick={()=>formPerbaruiTujuanx({ tujuan, indU: form.indU })}>Perbarui</button>
                                    )
                                }
                            </div>
                        </div>:''
                    )
                }
                <br/>
                {
                    (dbForm.length>0 ?
                        <div className="borderForm ">
                            <u className="cinfo"><label className="aiC pwrap_10  tbold fzL3">{`[  `}<span className="fzXl pwrap_5 cwhite">Daftar Data Pembuatan Form</span>{`]`} </label></u>
                            <Tabel1 
                                columns={col}
                                data={dbForm}
                                dbtn={[
                                    {label:"Perbarui", value:"bwarning"},
                                    {label:"Pengaturan Form", value:"binfo"},
                                    {label:"Preview", value:"bsuccess"}
                                ]}
                            ></Tabel1>
                        </div>:
                        <label className="tcenter w100p">pengguna belum melakukan aktivitas pembuatan form !!!</label>
                    )
                } 
            </div>
        </div>
        
    )
}
export default FEDnewData;