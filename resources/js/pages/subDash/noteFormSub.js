import React,  { useEffect,useRef   } from "react";
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useInput } from '../../hooks/useInput';
import { useDispatch,useSelector } from 'react-redux';
import { noteSub,_note, updNote, delNote } from "../../states/noted/action";
import ModalM from '../../components/Modal/modal';
import Tabel1 from "../../components/tabel/tabel1";
import ListIndukNote from '../../components/pages/listIndukNote';
import { userMenuS } from "../../states/sf/html/action"
import { htmlS, modalClose } from '../../states/sf/html/action';
import sfHtml from "../../components/mfc/sfHtml";

import Dropdown from "../../components/dropdonw/dbtn";

function NoteSub(){
    const { dnote } = useSelector((state) => state);
    const dispatch = useDispatch(); 

    const { value } = useParams();
    const {kdMember,kdJudul,tingkat} = JSON.parse(atob(value));
    // console.log(kdMember,kdJudul,tingkat); 

    const judulFokus = useRef(null);
    const [modalC, _modalC] = useState('');
    useEffect(() => {
        dispatch(noteSub({
            tingkat,
            kdJudul,
            kdMember
        })) 
    }, [dispatch]);

    const updMenu =({ v, sub })=>{
        dispatch(userMenuS({v,sub}))
    }
    
    const [form, _form] = useState({
        on : 1,
        add : 1
    })
    const [ind, _ind] = useState({
        i:0
    }) 
    const closeForm=()=>{
        _judul({ target:{value:'' }});
        _ringkasan({ target:{ value:''}})
        _form({
            on: 1,
            add:1
        })
    }
    const openFormAdd=()=>{
        _form({
            on: 1,
            add:1
        })
    }
    const openFormPerbarui=(v)=>{
        _form({
            on: 1,
            add:0
        })
        judulFokus.current.focus();
        const find =gind(v); 
        _judul({ target:{value:dnote.sub[find].judul }});
        _ringkasan({ target:{ value:dnote.sub[find].ringkasan}})
        _ind({
            i:find
        })
    }
    const formAddSub = () =>{
        dispatch(_note({
            judul,
            ringkasan,
            kdJudul:dnote.induk[inode].kdJudul,
            tingkat:parseInt(dnote.induk[inode].tingkat)+1,
            kdMember:dnote.induk[inode].kdMember,
        })).then(resp=>{
            if(resp){
                closeForm();
            }
        });
        
    }
    const formPerbaruiSub = () =>{
        find = ind.i;
        dispatch(updNote({
            judul,
            ringkasan,
            kdJudul:dnote.sub[find].kdJudul,
            kdMember:dnote.sub[find].kdMember,
            tingkat:dnote.sub[find].tingkat,
            find
        })).then(resp=>{
            if(resp==1){
                closeForm();
            }
        });
    }
    function mclose(){
        // console.log(dnote);
        dispatch(modalClose());
    }
    const [judul, _judul] = useInput();
    const [ringkasan, _ringkasan] = useInput();
    const [search, setSearch] = useInput('');
    const colNoted = [
        {
          name: 'No',
          selector: (row,i) =><><label className="aiC pwrap_10 cwarning tbold fzL3">{`[ `}<span className="fzXl cdark">{i+1}</span>{` ]`}</label></>,
          width : '100px'
        },{
            name: 'Judul',
            selector: row =>vjudul(row),
            width : '700px',
        },{
            cell:row =>vjudulbtn(row),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '350px'
        }
    ];
    const vjudul=(row)=>{
        return(
            <>
                <button class="btn fzXl pm0 cprimary" onClick={()=>changeSub({...row})} title="Access">
                    {row.judul}
                </button> <br/>
                {/* <span className="fzXl">{row.judul}</span> <br/> */}
                <label className="cmuted">{row.ringkasan}</label>
            </>
        )
    }
    const vjudulbtn=(row)=>{ 
        return( 
            <div className="btnGroup blight mwrap-5">
                <Link class="btn csuccess aiC tstart" target="_blank" to={'/Pnoted/'+btoa(JSON.stringify({
                        kdJudul:row.kdJudul,
                        kdMember:row.kdMember,
                        tingkat:row.tingkat,
                    }))} onClick={()=>updMenu({v:5,sub:1})} title="Preview"> 
                    <span className="mdi mdi-arrow-right-bold-circle"></span> 
                </Link>
                <Link class="btn cprimary" target="_blank"  to={'/fu-sub/'+btoa(JSON.stringify({
                        kdJudul:row.kdJudul,
                        kdMember:row.kdMember,
                        tingkat:row.tingkat,
                    }))} title="Form Upload"> 
                    <span className="mdi mdi-cloud-upload"></span> 
                </Link>
                <Link class="btn cinfo" target="_blank"  to={'/fe-sub/'+btoa(JSON.stringify({
                        kdJudul:row.kdJudul,
                        kdMember:row.kdMember,
                        tingkat:row.tingkat,
                    }))} title="Form Entri"> 
                    <span className="mdi mdi-format-list-bulleted"></span> 
                </Link>
                <button class="btn cwarning" onClick={()=>openFormPerbarui(row)} title="Perbarui"><span className="mdi mdi-lead-pencil"></span></button>
                <button class="btn cdanger" onClick={()=>delKonfir(row)} title="Hapus"><span className="mdi mdi-trash-can"></span></button>
                {/* <button class="btn csuccess" onClick={()=>changeSub({...row})} title="Access">
                    <span className="mdi mdi-arrow-right-bold-circle"></span>     
                </button> */}
                
            </div>
        )
    }
    const delKonfir = (v) =>{   
        const i =dnote.sub.findIndex((val)=>val.kdJudul === v.kdJudul ); 
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
    const xdeled = (index) =>{    
        dispatch(delNote({  
            kdJudul:dnote.sub[index].kdJudul,
            kdMember:dnote.sub[index].kdMember, 
            tingkat:dnote.sub[index].tingkat,
            index
        })); 
        mclose(); 
    }
    const changeSub=({tingkat, kdMember, kdJudul})=>{
        dispatch(noteSub({
            tingkat,
            kdJudul,
            kdMember
        })) 
    }
    const gind=(v)=>{
       return dnote.sub.findIndex((val)=> (val.kdJudul+val.kdMember+val.tingkat) === (v.kdJudul+v.kdMember+v.tingkat) );
    }

    const back=(find)=>{ 
        dispatch(noteSub({
            tingkat:dnote.induk[find].tingkat,
            kdJudul:dnote.induk[find].kdJudul,
            kdMember:dnote.induk[find].kdMember
        })) 
    }
    
    if(dnote.induk==undefined){
        return '';
    }
    const inode = dnote.induk.length-1;
    return (
        <>
            <div className="boxShadow flexC w90p mauto radius-10 pwrap__2p">
                <div className="flexR jcSB">
                    <div class="w50p flexR">
                        <button className="btn bdark">
                            <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                        </button>
                        <h2 className=" pm0 pwrap_5p pl0 cdark aiC fBebasNeue">
                            <b>{dnote.induk[inode].judul}</b> 
                        </h2>
                    </div>
                    <div>
                        {
                            (
                                inode>0 &&
                                <button class="btn bdark" onClick={()=>back(inode-1)}>Back</button>
                            )
                        }
                        
                        <button class="btn bprimary" onClick={()=>openFormAdd()}>Entri</button>
                    </div>
                </div>
                <hr/>
                {
                    (
                        form.on == 1 &&
                        <div className="bwhite  radius-10 mwrap_2p ">
                            <h3><small class="cdark fzXl tupper"> <u><b>{dnote.induk[inode].ringkasan} :</b></u></small> <br/>  </h3>  
                            <div className="doubleInput  ptb10px ">
                                <label>Judul Sub Note</label>
                                <div className="iconInput2 ">
                                    <input className="borderR10px" ref={judulFokus}  type="text" value={judul} onChange={_judul} placeholder="Judul Note" />
                                    <span className={`mdi mdi-notebook-edit-outline ${(form.add == 1 ? 'cprimary': 'cwarning')} `}></span>
                                </div>
                            </div>
                            <div className="doubleInput  ptb10px   borderB">
                                <label>Ringkasan <span className={`mdi mdi-sticker-text-outline ${(form.add == 1 ? 'cprimary': 'cwarning')} `}></span></label>
                                <div className="iconInput2 ">
                                    <textarea rows={3} className="radius-10 pwrap-10 w100p" value={ringkasan} onChange={_ringkasan}></textarea>
                                </div>
                            </div>
                            <hr/>
                            <div>
                                {
                                    (
                                        form.add == 1 ?
                                            <button class="btn bprimary" onClick={()=>formAddSub()}>Tambahkan</button>
                                        :
                                            <button class="btn bwarning" onClick={()=>formPerbaruiSub()}>Perbarui</button>
                                    )
                                }
                            </div>
                        </div> 
                    ) 
                }   
            </div>
            <div className="w90p mwrap__2p mauto_ pwrap-5 radius-10  boxShadow  pwrap__3p">
                <div className="flexR jcSB">
                    <div class="w50p flexR">
                        <button className="btn bdark">
                            <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                        </button>
                        <h2 className=" pwrap_5p pl0 cdark aiE fBebasNeue">List Noted Selected</h2>
                    </div> 
                </div> 
                <div className="pwrap_2p bwhite">
                    <div className="cprimary">
                        <hr/>
                        <ListIndukNote
                            dt={dnote.induk}
                            back={back}
                        ></ListIndukNote>
                        <hr/> 
                    </div>
                    {
                        (
                            dnote.sub.length>0 &&
                            <Tabel1
                                search={search}
                                oncSearch={setSearch}
                                columns={colNoted}
                                data={dnote.sub.filter((item) => {
                                        if (search === "") {
                                            return item;
                                        } else if (
                                            item.judul.toLowerCase().includes(search.toLowerCase()) || item.ringkasan.toLowerCase().includes(search.toLowerCase())
                                        ) {
                                            return item;
                                        }
                                    })}
                            ></Tabel1> 
                        )
                    } 
                    
                </div>
            </div>
                                
            
            <ModalM
                children ={modalC} 
            ></ModalM>
        </>
    )
}
export default NoteSub;