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
import ListIndukNote from '../../components/pages/listIndukNote';


function Noted ({ userMenu }){ 
    const { dnote } = useSelector((state) => state);
    const dispatch = useDispatch(); 
    const [form, _form] = useState({
        on : 0,
        add : 1
    })
    useEffect(() => {
        dispatch(note({
            tingkat:0
        })) 
    }, [dispatch]);
    const judulFokus = useRef(null);

    const [ind, _ind] = useState({
        i:0
    }) 
    
    const openFormAdd=()=>{
        _form({
            on: 1,
            add:1
        })
    }
    const openFormPerbarui=({i})=>{
        _form({
            on: 1,
            add:0
        })
        
        _judul({ target:{value:dnote[i].judul }});
        _ringkasan({ target:{ value:dnote[i].ringkasan}})
        _ind({
            ...ind,
            i
        })
        if(form.on==1){
            judulFokus.current.focus();
        }
    }
    const [modalC, _modalC] = useState('');
    const [search, _search] = useInput('');

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
            kdJudul:dnote[i].kdJudul,
            kdMember:dnote[i].kdMember, 
            tingkat:dnote[i].tingkat,
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
            judul,
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
            judul,
            ringkasan,
            kdJudul:dnote[find].kdJudul,
            kdMember:dnote[find].kdMember,
            tingkat:0,
            find,
        })).then(resp=>{
            if(resp){
                closeForm();
            }
        });
    }

    
    const [judul, _judul] = useInput();
    const [ringkasan, _ringkasan] = useInput();
    
    return (
        <>
            <div className="boxShadow flexC w90p mauto radius-10 pwrap__2p">
                <div className="flexR jcSB ja">
                    <div class="w50p flexR">
                        <button className="btn bdark">
                            <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                        </button>
                        <h2 className=" pwrap_5p pl0 cdark aiE fBebasNeue">Data Noted</h2>
                    </div>
                    {
                        (
                            form.on!=1 &&
                            <button class="btn bprimary" onClick={()=>openFormAdd()}>Open Form Entri</button>
                        )
                    }
                    
                </div>
                {
                    (
                        form.on == 1 &&
                        <div className="bwhite pwrap-5 radius-10 mwrap__2p flexC">
                            <div className="flexR jcSB"> 
                                <div className="doubleInput ptb10px w40p">
                                    <label>Judul Note</label>
                                    <div className="iconInput2 ">
                                        <input className="borderR10px" type="text" ref={judulFokus} value={judul} onChange={_judul} placeholder="Judul Note" />
                                        <span className={`mdi mdi-notebook-edit-outline ${(form.add == 1 ? 'cprimary': 'cwarning')} `}></span>
                                    </div>
                                </div>
                                <div className="doubleInput ptb10px borderB w40p">
                                    <label>Ringkasan <span className={`mdi mdi-sticker-text-outline ${(form.add == 1 ? 'cprimary': 'cwarning')} `}></span></label>
                                    <div className="iconInput2 ">
                                        <textarea rows={1} className="radius-10 pwrap-10 w100p" value={ringkasan} onChange={_ringkasan}></textarea>
                                    </div>
                                </div>
                                
                            </div>
                            <hr/>
                            <div className="jcE">
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
                        </div>
                    ) 
                } 
                {
                    (
                        dnote.length>0 &&
                        <div className="bwhite pwrap-5 radius-10 mwrap__2p cwarning">
                            <hr className="cprimary"/> 
                            <div className="jcE ">
                                <div className={`iconInput2 w30p`}>
                                    <input className="borderR10px" type="text" value={search} onChange={_search}  placeholder="search..." />
                                    <span className="mdi mdi-cloud-search "></span>
                                </div>
                            </div>
                            <hr className="cprimary"/> 
                            <ListNoted
                                openFormPerbarui={openFormPerbarui}
                                delKonfir={delKonfir}
                                dt={dnote.filter((item) => {
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
            <ModalM
                children ={modalC} 
            ></ModalM>
        </>
    );
}
Noted.PropTypes = {
    sub : PropTypes.number.isRequired
}
export default Noted;
