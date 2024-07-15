import React,  { useEffect,useRef   } from "react";
import { noteSubFileUpload, actUFSubNote, baseUrl } from "../../states/noted/action";
import { useDispatch,useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import sfLib from '../../components/mfc/sfLib';
import sfHtml from "../../components/mfc/sfHtml";
import ModalM from '../../components/Modal/modal';
import { htmlS, modalClose } from '../../states/sf/html/action';
import Tabel1 from "../../components/tabel/tabel1";
import { toast } from "react-toastify";
import { userMenuS } from "../../states/sf/html/action"
import ListInformasiNote from '../../components/pages/listInformasiNote';

function FormUpload() {
    const { dnote, _html } = useSelector((state) => state);
    const dispatch = useDispatch(); 

    const { value } = useParams();
    const {kdMember,kdJudul,tingkat} = JSON.parse(atob(value));
    const judulFokus = useRef(null);
    const [judul, _judul] = useInput();
    const [url, _url] = useInput();
    const [modalC, _modalC] = useState('');
    const [files, _files] = useState('-'); 
    const [search, _search] = useInput('');
 
    const colFile = [
        {
          name: 'No',
          selector: row => row.ind,
          width : '200px'
        }
        ,{
            name: 'Judul',
            selector: row =>{
                return (
                    <span class="btn " target="_blank" onClick={()=>{window.open((row.url!='-'?row.url:baseUrl+'storage/'+row.file))}} title="Form Upload"> 
                        {row.keterangan}
                    </span>
                )
            },
        },
        // {
        //     cell:row =>vjudulbtn(row),
        //     ignoreRowClick: true,
        //     allowOverflow: true,
        //     button: true,
        //     width: '250px'
        // }
    ]; 
    useEffect(() => {
        dispatch(noteSubFileUpload({
            tingkat,
            kdJudul,
            kdMember
        }));
        dispatch(userMenuS({v:41,sub:1}))
    }, [dispatch]);
    const [form, _form] = useState({
        on : 1,
        add : 1
    })
    
    if(dnote.induk==undefined){
        return '';
    } 
    const inode = dnote.induk.length-1;
    
    function mclose(){
        // console.log(dnote);
        dispatch(modalClose());
    }
    const upload = () =>{ 
        if(judul.length ===0 ){
            return toast.error('Mohon untuk menambahkan Judul Dokumen !!!');
        }
        if(files ==='-' && url.length<2){
            return toast.error('Mohon untuk menambahkan dokumen !!!');
        }
        _modalC(
            sfHtml.modalForm({
                label : "Konfirmasi pengunggahan",
                mclose,
                clsH: " bprimary",
                children : (
                    <p>
                        Tambahkan dokumen pendukung ?
                    </p>
                ),
                footer : (
                    sfHtml.modalBtn({
                        mclose,
                        xadded:uploaded
                    })
                )
            })
        );
        dispatch(
            htmlS({
                modal : true,
            })
        );
    }
    const uploaded = () =>{
        dispatch(actUFSubNote({  
            kdJudul,
            kdMember, 
            files,
            judul,
            url
        }));
        mclose(); 
        resetValue();
    }
    const resetValue=()=>{
        _judul({target:{value:''}});
        _files('-');
        _url({target:{value:''}});
    }  
    return (
        <>
            {
                (
                    dnote.induk.length>0 &&
                    <ListInformasiNote dinduk={dnote.induk} key={1}></ListInformasiNote>
                )
            } 
            <div className="boxShadow flexC w90p radius-10 pwrap__2p mwrap__2p mauto_">
                <div className="flexR jcSB">
                    <div class="w50p flexR">
                        <button className="btn bdark">
                            <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                        </button>
                        <h2 className=" pwrap_5p pl0 cdark aiE fBebasNeue">Form Upload</h2>
                    </div>  
                </div>
                <div className="flexR jcSB pwrap_5p bwhite">
                    <div className="doubleInput ptb10px pwrap_2p">
                        <label>Judul File</label>
                        <div className="iconInput2 ">
                            <input className="borderR10px" ref={judulFokus}  type="text" value={judul} onChange={_judul} placeholder="Judul Note" />
                            <span className={`mdi mdi-cloud-search ${(form.add == 1 ? 'cprimary': 'cwarning')} `}></span>
                        </div>
                    </div> 
                    <div className="doubleInput ptb10px">
                        <label className="mw100px"><span className={`mdi mdi-file-upload cprimary fziconS`}></span>Dokumen (PDF) / URL</label>
                        <input className="borderR10px" type="file" value=''
                            onChange={(e)=>sfLib.readFile(e.target,_files)} />
                        {(files!='-' && <span><b>Nama File : </b> {files.nama}</span>)} 
                        <div className="iconInput2 mwrap__2p">
                            <input className="borderR10px" ref={judulFokus}  type="text" value={url} onChange={_url} placeholder="Url" />
                            <span className={`mdi mdi-cloud-search ${(form.add == 1 ? 'cprimary': 'cwarning')} `}></span>
                        </div>
                    </div>  
                    <div className="doubleInput ptb10px">
                        <label className="w200"></label>
                        <button class=" pwrap-5p btn bprimary " onClick={()=>upload()}>Tambahkan</button>
                    </div> 
                </div>   
            </div>
            <div className="boxShadow flexC w90p radius-10 pwrap__2p mwrap__2p mauto_">
                <div className="flexR jcSB">
                    <div class="w50p flexR">
                        <button className="btn bdark">
                            <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                        </button>
                        <h2 className=" pwrap_5p pl0 cdark aiE fBebasNeue">List Upload</h2>
                    </div>  
                </div>
                <div className="flexC jcSB pwrap_5p bwhite">
                    <Tabel1
                        search={search}
                        oncSearch={_search}
                        columns={colFile}
                        data={dnote.file.filter((item) => {
                                if (search === "") {
                                    return item;
                                } else if (
                                    item.keterangan.toLowerCase().includes(search.toLowerCase())
                                ) {
                                    return item;
                                }
                            })}
                    ></Tabel1>
                </div>   
            </div>
            <ModalM
                children ={modalC} 
            ></ModalM>
            
        </>
    )
}
export default FormUpload;