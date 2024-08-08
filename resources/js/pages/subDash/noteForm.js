import React,  { useEffect,useRef } from "react";
import { useState } from 'react';
import { useInput } from '../../hooks/useInput';
import { useDispatch,useSelector } from 'react-redux';

import PropTypes from "prop-types";
import ModalM from '../../components/Modal/modal';

import { note,_note, updNote, delNoteInduk } from "../../states/noted/action";
import ListNoted from '../../components/pages/listNoted';
import { htmlS, modalClose } from '../../states/sf/html/action';
import sfHtml from "../../components/mfc/sfHtml"; 
import Select from "react-select";  
import { userMenuS } from "../../states/sf/html/action";

function Noted ({ userMenu }){ 
    const { dnote } = useSelector((state) => state);
    const dispatch = useDispatch(); 
    const [form, _form] = useState({
        on : 0,
        add : 1
    }); 

    const [selOps, _selOps] = useState({}); 
    const [judul, _judul] = useInput();
    const [ringkasan, _ringkasan] = useInput();

    const [modalC, _modalC] = useState('');
    const [search, _search] = useInput('');
    
    useEffect(() => {
        dispatch(note({
            tingkat:0
        })) 
        dispatch(userMenuS({v:46,sub:2, isi:''}));

    }, [dispatch]);
    
    const judulFokus = useRef(null); 
    const [ind, _ind] = useState({
        i:0
    }) 
    
    const openFormAdd=()=>{
        _form({
            on: 1,
            add:1
        });
    }
    const openFormPerbarui=({i})=>{
        
        // judulFokus.current.focus();
        _form({
            on: 1,
            add:0
        })  
        _selOps(dkategori[djudul[i].indOps]);
        _judul({ target:{value:djudul[i].judul }});
        _ringkasan({ target:{ value:djudul[i].ringkasan}})
        _ind({
            ...ind,
            i,
        })
        if(form.on==1){
            judulFokus.current.focus();
        }
    }
   

    function mclose(){ 
        dispatch(modalClose());
    }
    const delKonfir=(i)=>{  
        _modalC(
            sfHtml.modalForm({
                label : "Konfirmasi Penghapusan Data",
                mclose,
                clsH: " bdanger",
                children : (
                    <p>
                        Anda ingin menghapus judul ini ?
                    </p>
                ),
                footer : (
                    sfHtml.modalBtn({
                        mclose,
                        xdeled:()=>xdeled(i)
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
    const xdeled = ({i}) =>{   
        dispatch(delNoteInduk({  
            kdJudul:djudul[i].kdJudul,
            kdMember:djudul[i].kdMember, 
            tingkat:djudul[i].tingkat,
            index:i
        })); 
        mclose(); 
    }
    const closeForm=()=>{
        _form({
            on: 0,
            add:1
        })
        _judul({ target:{value:'' }});
        _ringkasan({ target:{ value:''}})
    }
    const formAdd = () =>{ 
        dispatch(_note({
            judul:selOps.value+judul,
            ringkasan,
            tingkat:0,
            kdMember:'-',
            kdJudul:'-'
        })).then(resp=>{
            if(resp){
                closeForm();
            }
        });
    }
    const formPerbarui = () =>{
        find = ind.i;
        dispatch(updNote({
            judul:selOps.value+judul,
            ringkasan,
            kdJudul:djudul[find].kdJudul,
            kdMember:djudul[find].kdMember,
            tingkat:0,
            find, 
        })).then(resp=>{
            if(resp){
                closeForm();
            }
        });
    }

    
     
    if(Object.keys(dnote).length==0 ){
        return "";
    }
    if(dnote.dkategori == undefined){{ // ketika useEffect tidak dijalankan
        dispatch(note({
            tingkat:0
        }));
        return "";
    }} 
    const {induk:djudul,dkategori}=dnote;  
    

    
    // const maxOption = Math.max(doption.map(v=>v.value.length));

    if(Object.keys(selOps).length==0){
        _selOps(dkategori[0]);
    } 
    return (
        <div className="Mcontainer bgForm body aiS"> 
            <div className="left" >
                <div class="FM1">
                    <div class="header bwhite">
                        <div class="cdark flexR">
                            <button className="btn bdark">
                                <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                            </button>
                            <h2 className="  pl0 aiE fBebasNeue">Data Noted</h2>
                        </div>
                        {
                            (
                                form.on!=1 &&
                                <button class="btn bprimary" onClick={()=>openFormAdd()}>Open Form Entri</button>
                            )
                        } 
                    </div>
                    <div class="body bdark" style={{width:"unset"}}><br/>
                    {
                        (
                            form.on == 1 &&
                            // bwhite pwrap-5 radius-10 mwrap__2p 
                            <div className="" >
                                <div className="Flex-b250" >
                                    <div className="list doubleInput ptb10px ">
                                        <label>Judul Note</label>
                                        <div className="iconInput2 ">
                                            <input className="borderR10px" type="text" ref={judulFokus} value={judul} onChange={_judul} placeholder="Judul Note" />
                                            <span className={`mdi mdi-notebook-edit-outline ${(form.add == 1 ? 'cprimary': 'cwarning')} `}></span>
                                        </div>
                                    </div>
                                    <div className="list doubleInput ptb10px borderB ">
                                        <label>Kategori <span className={`mdi mdi-sticker-text-outline ${(form.add == 1 ? 'cprimary': 'cwarning')} `}></span></label>
                                        <Select
                                            className="mnw400 cdark"
                                            options={dkategori}
                                            placeholder={""}
                                            value={selOps}
                                            onChange={_selOps}
                                            isSearchable={false}
                                        />
                                    </div>
                                    <div className="list doubleInput ptb10px borderB ">
                                        <label>Ringkasan <span className={`mdi mdi-sticker-text-outline ${(form.add == 1 ? 'cprimary': 'cwarning')} `}></span></label>
                                        <div className="iconInput2 ">
                                            <textarea rows={3} className="radius-10 pwrap-10 w100p" value={ringkasan} onChange={_ringkasan}></textarea>
                                        </div>
                                    </div>
                                </div> 
                                <div className="list jcE">
                                    {
                                        (
                                            form.add == 1 ?
                                                <button class="btn bprimary" onClick={()=>formAdd()}>Tambahkan</button>
                                            :
                                                <button class="btn bwarning" onClick={()=>formPerbarui()}>Perbarui</button>
                                        )
                                    }
                                    <button class="btn bmuted" onClick={()=>closeForm()}>Tutup</button>
                                </div>
                                
                                <hr/>
                            </div>
                        ) 
                    } 
                    {
                        (
                            djudul.length>0 &&
                            // bwhite pwrap-5 radius-10 mwrap__2p cwarning
                            <div className="">
                                {/* <hr className="cprimary"/>  */}
                                <div className="jcE ">
                                    <div className={`iconInput2 w30p`}>
                                        <input className="borderR10px" type="text" value={search} onChange={_search}  placeholder="search..." />
                                        <span className="mdi mdi-cloud-search "></span>
                                    </div>
                                </div>
                                <br/>
                                {/* <hr className="cprimary"/>  */}
                                <ListNoted
                                    openFormPerbarui={openFormPerbarui}
                                    delKonfir={delKonfir}
                                    dt={djudul.filter((item) => {
                                        if (search === "") {
                                            return item;
                                        } else if (
                                            item.judul.toLowerCase().includes(search.toLowerCase()) || item.ringkasan.toLowerCase().includes(search.toLowerCase())
                                        ) {
                                            return item;
                                        }
                                    })}
                                ></ListNoted>
                                <hr className="cprimary"/> 
                            </div>
                        )
                    }   
                    </div>
                </div>    
            </div>   
            <div className="right-1">
                samping    
            </div>             
            <ModalM
                children ={modalC} 
            ></ModalM>
        </div>
    );
}
Noted.PropTypes = {
    sub : PropTypes.number.isRequired
}
export default Noted;
