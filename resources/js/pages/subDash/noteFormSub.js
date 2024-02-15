import React,  { useEffect,useRef   } from "react";
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useInput } from '../../hooks/useInput';
import { useDispatch,useSelector } from 'react-redux';
import { noteSub,_note, updNote } from "../../states/noted/action";

import Tabel1 from "../../components/tabel/tabel1";
import ListIndukNote from '../../components/pages/listIndukNote';

function NoteSub(){
    const { dnote } = useSelector((state) => state);
    const dispatch = useDispatch(); 

    const { value } = useParams();
    const {kdMember,kdJudul,tingkat} = JSON.parse(atob(value));
    // console.log(kdMember,kdJudul,tingkat);

    const judulFokus = useRef(null);

    useEffect(() => {
        dispatch(noteSub({
            tingkat,
            kdJudul,
            kdMember
        })) 
    }, [dispatch]);

    
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
            tingkat:(dnote.induk[inode].tingkat+1),
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
    const [judul, _judul] = useInput();
    const [ringkasan, _ringkasan] = useInput();
    const [search, setSearch] = useInput('');
    const colNoted = [
        {
          name: 'No',
          selector: row => row.kdJudul,
          width : '200px'
        },{
            name: 'Judul',
            selector: row =>vjudul(row),
        },{
            cell:row =>vjudulbtn(row),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '250px'
        }
    ];
    const vjudul=(row)=>{
        return(
            <>
                <span className="fzXl">{row.judul}</span> <br/><label className="cmuted">{row.ringkasan}</label>
            </>
        )
    }
    const vjudulbtn=(row)=>{
        return(
            <>
                <button class="btn bwarning" onClick={()=>openFormPerbarui(row)} title="Perbarui"><span className="mdi mdi-lead-pencil"></span></button>
                <button class="btn bdanger" onClick={()=>delKonfir(row)} title="Hapus"><span className="mdi mdi-trash-can"></span></button>
                <button class="btn bsuccess" onClick={()=>changeSub({...row})} title="Access">
                    <span className="mdi mdi-arrow-right-bold-circle"></span>     
                </button>
                {/* <Link class="btn bsuccess" to={'/home/notedSub/'+btoa(JSON.stringify({
                        kdJudul:row.kdJudul,
                        kdMember:row.kdMember,
                        tingkat:row.tingkat,
                    }))} title="access"> 
                    <span className="mdi mdi-arrow-right-bold-circle"></span> 
                </Link> */}
            </>
        )
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

    const back=()=>{
        find =inode-1;
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
            <div className="flexR jcSB">
                <div class="w50p flexR">
                    <button className="btn bdark">
                        <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                    </button>
                    <h2 className=" pwrap_5p pl0 cdark aiE fBebasNeue">List Noted Selected</h2>
                </div>
                <div>
                    {
                        (
                            inode>0 &&
                            <button class="btn bdark" onClick={()=>back()}>Back</button>
                        )
                    }
                    
                    <button class="btn bprimary" onClick={()=>openFormAdd()}>Entri</button>
                </div>
            </div>
            {
                (
                    form.on == 1 &&
                    <div className="bwhite pwrap-5 radius-10 mwrap__2p boxShadow formSimple">
                        <div className="w50p">
                            <h2 className="fPoppins pwrap_2p cprimary">*Note</h2>
                            <ul>
                                <li>
                                    <span>Judul</span>
                                    <h2 className="tcapital">{dnote.induk[inode].judul}</h2>
                                </li>
                                <li>
                                     <span>Ringkasan</span>
                                    <h4>{dnote.induk[inode].ringkasan}</h4>
                                </li>
                                <li>
                                     <span>Create Date</span>
                                    <h6>{dnote.induk[inode].created_at}</h6>
                                </li>
                            </ul>
                        </div>
                        <div className="w50p kanan">
                            <div className="doubleInput ptb10px">
                                <label>Judul Sub Note</label>
                                <div className="iconInput2 ">
                                    <input className="borderR10px" ref={judulFokus}  type="text" value={judul} onChange={_judul} placeholder="Judul Note" />
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
                                            <button class="btn bprimary" onClick={()=>formAddSub()}>Tambahkan</button>
                                        :
                                            <button class="btn bwarning" onClick={()=>formPerbaruiSub()}>Perbarui</button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ) 
            }   
            {
                (
                    dnote.sub.length>0 &&
                    <div className=" bwhite pwrap-5 radius-10 mwrap__2p boxShadow bwhite pwrap__3p">
                        <div className="pwrap_2p cprimary">
                            <h2 className="fPoppins">*Note</h2>
                            <ListIndukNote
                                dt={dnote.induk}
                            ></ListIndukNote>
                            <Tabel1
                                search={search}
                                oncSearch={setSearch}
                                columns={colNoted}
                                data={dnote.sub.filter((item) => {
                                        if (search === "") {
                                            return item;
                                        } else if (
                                            item.judul.toLowerCase().includes(search.toLowerCase())
                                        ) {
                                            return item;
                                        }
                                    })}
                            ></Tabel1>
                        </div>
                    </div>
                )
            }                     
            
            
        </>
    )
}
export default NoteSub;