import React,  { useEffect,useRef } from "react";
import { useState } from 'react';
import { useInput } from '../../hooks/useInput';
import { useDispatch,useSelector } from 'react-redux';

import PropTypes from "prop-types";

import { note,_note, updNote } from "../../states/noted/action";
import ListNoted from '../../components/pages/listNoted';

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
        judulFokus.current.focus();
        _judul({ target:{value:dnote[i].judul }});
        _ringkasan({ target:{ value:dnote[i].ringkasan}})
        _ind({
            ...ind,
            i
        })
    }
    const delKonfir=()=>{

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
            <div className="flexR jcSB">
                <div class="w50p flexR">
                    <button className="btn bdark">
                        <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                    </button>
                    <h2 className=" pwrap_5p pl0 cdark aiE fBebasNeue">Data Noted</h2>
                </div>
                <button class="btn bprimary" onClick={()=>openFormAdd()}>Entri</button>
            </div>
            {
                (
                    form.on == 1 &&
                    <div className="bwhite pwrap-5 radius-10 mwrap__2p boxShadow formSimple">
                        <div className="w50p">
                            
                        </div>
                        <div className="w50p kanan">
                            <div className="doubleInput ptb10px">
                                <label>Judul Note</label>
                                <div className="iconInput2 ">
                                    <input className="borderR10px" type="text" ref={judulFokus} value={judul} onChange={_judul} placeholder="Judul Note" />
                                    <span className={`mdi mdi-cloud-search ${(form.add == 1 ? 'cprimary': 'cwarning')} `}></span>
                                </div>
                            </div>
                            <div className="doubleInput ptb10px borderB">
                                <label>Ringkasan <span className={`mdi mdi-cloud-search ${(form.add == 1 ? 'cprimary': 'cwarning')} `}></span></label>
                                <div className="iconInput2 ">
                                    <textarea rows={3} className="radius-10 pwrap-10 w100p" value={ringkasan} onChange={_ringkasan}></textarea>
                                </div>
                            </div>
                            <div>
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
                    </div>
                ) 
            }   
            {
                (
                    dnote.length>0 &&
                    <ListNoted
                        openFormPerbarui={openFormPerbarui}
                        delKonfir={delKonfir}
                        dt={dnote}
                    ></ListNoted>
                )
            }                     
            
        </>
    );
}
Noted.PropTypes = {
    sub : PropTypes.number.isRequired
}
export default Noted;
