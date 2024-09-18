import React,  { useEffect,useRef,useState, useTransition    } from "react";
import { Link, useParams } from 'react-router-dom'; 
import { useInput } from '../../hooks/useInput';
import { useDispatch,useSelector } from 'react-redux';
import { noteSub,_note, updNote, delNote } from "../../states/noted/action";
import ModalM from '../../components/Modal/modal';
import Tabel1 from "../../components/tabel/tabel1";
import ListIndukNote from '../../components/pages/listIndukNote';
import { userMenuS } from "../../states/sf/html/action"
import { htmlS, modalClose } from '../../states/sf/html/action';
import sfHtml from "../../components/mfc/sfHtml";
import Select from "react-select";  


function NoteSub(){
    const { dnote } = useSelector((state) => state);
    const dispatch = useDispatch(); 

    const { value } = useParams();
    const {kdMember,kdJudul,tingkat} = JSON.parse(atob(value));
    const [selOps, _selOps] = useState({}); 

    
    // const [isPending, startTransition] = useTransition();


    const judulFokus = useRef(null);
    const [modalC, _modalC] = useState('');
    useEffect(() => {
        dispatch(noteSub({
            tingkat,
            kdJudul,
            kdMember,
            sumber:"subNote"
        })) 
        dispatch(userMenuS({v:46,sub:2, isi:''})); 
    }, [dispatch]);

    const updMenu =({ v, sub })=>{
        dispatch(userMenuS({v,sub}))
    }
    
    const [form, _form] = useState({
        on : 0,
        add : 1
    })
    const [ind, _ind] = useState({
        i:0
    }) 
    const closeForm=()=>{
        _judul({ target:{value:'' }});
        _ringkasan({ target:{ value:''}})
        _form({
            on: 0,
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
        const find =gind(v); 
        _judul({ target:{value:dnote.sub[find].judul }});
        _ringkasan({ target:{ value:dnote.sub[find].ringkasan}}); 
        _selOps(dkategori[dnote.sub[find].indOps]);
        _ind({
            i:find
        })
        try { // terkadang form masih tertutup 
            judulFokus.current.focus();
        } catch (error) {
        }
    }
    const formAddSub = () =>{
        dispatch(_note({
            judul:selOps.value+judul,
            ringkasan,
            kdJudul:induk[inode].kdJudul,
            tingkat:parseInt(induk[inode].tingkat)+1,
            kdMember:induk[inode].kdMember,
        })).then(resp=>{
            if(resp){
                closeForm();
            }
        });
        
    }
    const formPerbaruiSub = () =>{
        find = ind.i;
        dispatch(updNote({
            judul:selOps.value+judul,
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
        // tbl max 800px
        {
          name: 'No',
          selector: (row,i) =><><label className="aiC pwrap_10 cwarning tbold fzL3">{`[ `}<span className="fzXl cdark">{i+1}</span>{` ]`}</label></>,
          width : '90px'
        },{
            name: 'Judul',
            selector: row =>vjudul(row),
            width : '450px',
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
            <div className="btnGroup mwrap-5">
                <Link class="btn bsuccess aiC tstart" target="_blank" to={'/Pnoted/'+btoa(JSON.stringify({
                        kdJudul:row.kdJudul,
                        kdMember:row.kdMember,
                        tingkat:row.tingkat,
                    }))} onClick={()=>updMenu({v:5,sub:1})} title="Preview"> 
                    <span className="mdi mdi-arrow-right-bold-circle"></span> 
                </Link>
                {(keyAkses.pemilik || xformUpload?
                    <Link class="btn bprimary" target="_blank"  to={'/fu-sub/'+btoa(JSON.stringify({
                            kdJudul:row.kdJudul,
                            kdMember:row.kdMember,
                            tingkat:row.tingkat,
                        }))} title="Form Upload"> 
                        <span className="mdi mdi-cloud-upload"></span> 
                    </Link>:''
                )}
                {(keyAkses.pemilik || xformEntri?
                    <Link class="btn binfo" target="_blank"  to={'/fe-sub/'+btoa(JSON.stringify({
                            kdJudul:row.kdJudul,
                            kdMember:row.kdMember,
                            tingkat:row.tingkat,
                        }))} title="Form Entri"> 
                        <span className="mdi mdi-format-list-bulleted"></span> 
                    </Link>:''
                )} 
                {(
                    keyAkses.pemilik || row.kdMemberSub == keyAkses.kdMember?
                    <>
                        <button class="btn bwarning" onClick={()=>openFormPerbarui(row)} title="Perbarui"><span className="mdi mdi-lead-pencil"></span></button>
                        <button class="btn bdanger" onClick={()=>delKonfir(row)} title="Hapus"><span className="mdi mdi-trash-can"></span></button>
                    </>:''

                )} 
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
            tingkat:induk[find].tingkat,
            kdJudul:induk[find].kdJudul,
            kdMember:induk[find].kdMember
        })) 
    }
    
    if(Object.keys(dnote).length<3){
        return '';
    } 
    const { induk,sub,file,form:dform,dkategori, keyAkses  } = dnote; 
    if(keyAkses==undefined){
        return "";
    }
    const { xcatatan,xformEntri,xformUpload  } = keyAkses.dpCatatan;

    if(induk.length==0){
        return "";
    }
    const inode = induk.length-1;
    if(sub == undefined){ // ketika useEffect tidak dijalankan
        dispatch(noteSub({
            tingkat,
            kdJudul,
            kdMember
        }));
        return "";
    }  
    if(Object.keys(selOps).length == 0){
        _selOps(dkategori[0]);
    }  
    
    
    return (
        <div className="Mcontainer2Form bgForm body aiS"> 
            <div className="left" > 
                <div class="FM1">
                    <div class="header bwhite">
                        <div class="cdark flexR">
                            <button className="btn bdark">
                                <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                            </button>
                            <h2 className="  pl0 aiE fBebasNeue">
                                <b>List Noted Selected</b> 
                            </h2>
                        </div> 
                    </div>
                    <div class="body bdark" style={{width:"unset" }}><br/>  
                        <div className="">
                            <div className="cprimary">
                                <hr/>
                                <ListIndukNote
                                    dt={induk}
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
                                        dbtn={[
                                            {label:"Preview",value:"bsuccess"},
                                            {label:"Form Upload",value:"bprimary"},
                                            {label:"Form Entri",value:"binfo"},
                                            {label:"Perbarui",value:"bwarning"},
                                            {label:"Hapus",value:"bdanger"}
                                        ]}
                                    ></Tabel1> 
                                )
                            } 
                            
                        </div>
                    </div>
                </div> 
            </div> 
            <div className="right">
                {(xcatatan || keyAkses.pemilik ?
                    <div class="FM1 ">
                        <div class="header bwhite">
                            <div class="cdark flexR">
                                <button className="btn bdark">
                                    <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                                </button>
                                <h2 className="  pl0 aiE fBebasNeue">
                                    <b>{`[FORM] `+induk[inode].judul}</b> 
                                </h2>
                            </div>
                            <div className="btnGroup">
                                {
                                    (
                                        inode>0 &&
                                        <button class="btn bdark " onClick={()=>back(inode-1)}>Back</button>
                                    )
                                } 
                                <button class="btn bprimary" onClick={()=>openFormAdd()}>Entri</button>
                            </div>
                        </div>
                        <div class="body bdark pwrap-10" style={{width:"unset"}} ><br/> 
                            {
                                (
                                    form.on == 1 &&
                                    <div className="">
                                        <h3><small class="fzXl tupper"> <u><b>{(induk[inode].indOps == 0 ? induk[inode].ringkasan+" :" : "")}</b></u></small> <br/>  </h3>  
                                        
                                        <div className="Flex-b250" >
                                            <div className="list doubleInput ptb10px ">
                                                <label>Judul Note</label>
                                                <div className="iconInput2 ">
                                                    <input className="borderR10px" type="text" ref={judulFokus} value={judul} onChange={_judul} placeholder="Judul Note" />
                                                    <span className={`mdi mdi-notebook-edit-outline ${(form.add == 1 ? 'cprimary': 'cwarning')} `}></span>
                                                </div>
                                            </div>
                                            <div className="list doubleInput ptb10px borderB  cdark">
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
                                            <div className="list doubleInput ptb10px borderB  ">
                                                <label>Ringkasan <span className={`mdi mdi-sticker-text-outline ${(form.add == 1 ? 'cprimary': 'cwarning')} `}></span></label>
                                                <div className="iconInput2 ">
                                                    <textarea rows={3} className="radius-10 pwrap-10 w100p" value={ringkasan} onChange={_ringkasan}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="list jcE">
                                            {
                                                (
                                                    form.add == 1 ?
                                                        <button class="btn bprimary" onClick={()=>formAddSub()}>Tambahkan</button>
                                                    :
                                                        <button class="btn bwarning" onClick={()=>formPerbaruiSub()}>Perbarui</button>
                                                )
                                            }
                                            <button class="btn bmuted" onClick={()=>closeForm()}>Tutup</button>
                                        </div> 
                                    </div> 
                                    
                                )
                            }    
                            {/* w90p mwrap__2p mauto_ pwrap-5 radius-10  boxShadow  pwrap__3p  */}
                            
                        </div>
                    </div>:''
                )}
                
            </div>
            <ModalM
                children ={modalC} 
            ></ModalM>
        </div>
    )
}
export default NoteSub;