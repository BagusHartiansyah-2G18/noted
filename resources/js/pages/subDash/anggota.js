import React,  { useEffect,useRef,useState } from "react";
import PropTypes from "prop-types";
import { useInput } from '../../hooks/useInput';
import { useDispatch,useSelector } from 'react-redux';
import { __anggota, _anggota, undangAnggota,batalkanAnggota,terimaAnggota } from "../../states/anggota/action";
import Tabel1 from "../../components/tabel/tabel1";

import { checkForm, _statusAnggota } from "../../states/sf/html/action";
import { toast } from "react-toastify";

import ModalM from '../../components/Modal/modal';
import { htmlS, modalClose } from '../../states/sf/html/action';
import sfHtml from "../../components/mfc/sfHtml"; 
import { userMenuS } from "../../states/sf/html/action";   

function Anggota ({ sub }){
    const { dangg } = useSelector((state) => state);
    const dispatch = useDispatch(); 

    const [form, _form] = useState({
        on : 0,
        add : 1
    }); 
    const [name, _name] = useInput('');
    const [email, _email] = useInput('');
    const [pass, _pass] = useInput('');
    
    const [nmAnggota, _nmAnggota] = useInput('');

    const fokus = useRef(null); 
    const [search, setSearch] = useInput('');

    const [modalC, _modalC] = useState('');


    useEffect(() => {
        dispatch(__anggota());
        dispatch(userMenuS({v:46,sub:2, isi:''}));
    }, [dispatch]);


    const openFormAdd=()=>{
        _form({
            on: 1,
            add:1
        });
    }
    const actAnggota = () =>{ 
        dispatch(_anggota({
            name,
            email,
            password:pass, 
        })).then(resp=>{
            if(resp){
                // closeForm();
            }
        });
    } 
    const actUndangAnggota = () =>{
        const {cf,msg,ind} = checkForm([
            {type:"email",minLength:5,value:nmAnggota}
        ]);
        if(!cf)return toast.error(msg);
        
        dispatch(undangAnggota({ 
            email:nmAnggota, 
        })).then(resp=>{
            if(resp){
                // closeForm();
            }
        });
    }  

    const kompBatalkan=(i)=>{  
        _modalC(
            sfHtml.modalForm({
                label : "Konfirmasi",
                mclose,
                clsH: " bdanger",
                children : (
                    <p>
                        Batalkan Penambahan anggota ?
                    </p>
                ),
                footer : (
                    sfHtml.modalBtn({
                        mclose,
                        xdeled:()=>kompBatalkaned(i)
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
    const kompBatalkaned = (i) =>{    
        dispatch(batalkanAnggota({  
            id:i.id,
            idAdd:i.idAdd,
            idAdded:i.idAdded 
        })); 
        mclose(); 
    }

    const kompTerima=(i)=>{  
        _modalC(
            sfHtml.modalForm({
                label : "Konfirmasi",
                mclose,
                clsH: " bsuccess",
                children : (
                    <p>
                        Anda ingin terhubung dengan pengundang ?
                    </p>
                ),
                footer : (
                    sfHtml.modalBtn({
                        mclose,
                        btn:{
                            cls:" bsuccess",
                            onClick:()=>kompTerimaed(i),
                            text:"Terima"
                        }
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
    const kompTerimaed = (i) =>{    
        dispatch(terimaAnggota({  
            id:i.id,
            idAdd:i.idAdd,
            idAdded:i.idAdded 
        })); 
        mclose(); 
    }
    
    function mclose(){ 
        dispatch(modalClose());
    }
    const coll=[{
        name: 'No',
        selector: (row,i) =><><label className="aiC pwrap_10 cwarning tbold fzL3">{`[ `}<span className="fzXl cdark">{i+1}</span>{` ]`}</label></>,
        width : '90px'
    },{
        name: 'Nama',
        selector: row =><b>{row.name}</b>,
        width : '150px',
    },{
        name: 'Email',
        selector: row =>row.email,
        width : '250px',
    },{
        name: 'Status',
        selector: row => _statusAnggota(row.status),
        width : '150px',
    },{
        cell:(row,i) =><>
            <div className="btnGroup">
                {(
                    row.saya?
                    <>
                        <button class="btn bdanger" onClick={()=>kompBatalkan({i,...row})} title="Batalkan Undangan">
                            <span className="mdi mdi-account-remove"></span> 
                        </button>
                    </>:
                    <>
                        <button class="btn bsuccess" onClick={()=>kompTerima({i,...row})} title="Terima Undangan">
                            <span className="mdi mdi-account-check"></span> 
                        </button> 
                    </>
                )}
            </div>
            
        </>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: '150px'
    }];
    
    return (
    <>
        <div className="Mcontainer2Form bgForm body aiS"> 
            <div className="left">
                <div class="FM1">
                    <div class="header bwhite">
                        <div class="cdark flexR">
                            <button className="btn bdark">
                                <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                            </button>
                            <h2 className="  pl0 aiE fBebasNeue">Daftar Anggota</h2>
                        </div> 
                    </div>
                    <div class="body bdark" style={{width:"unset"}}><br/> 
                        <div>
                            <Tabel1
                                search={search}
                                oncSearch={setSearch}
                                columns={coll}
                                data={dangg.filter((item) => {
                                        if (search === "") {
                                            return item;
                                        } else if (
                                            item.judul.toLowerCase().includes(search.toLowerCase()) || item.ringkasan.toLowerCase().includes(search.toLowerCase())
                                        ) {
                                            return item;
                                        }
                                    })}
                                dbtn={[
                                    {label:"Terima",value:"bsuccess"},
                                    // {label:"Form Upload",value:"bprimary"},
                                    // {label:"Form Entri",value:"binfo"},
                                    // {label:"Perbarui",value:"bwarning"},
                                    {label:"Batalkan",value:"bdanger"}
                                ]}
                            ></Tabel1> 
                        </div>
                    </div>
                </div>  
            </div>
            <div className="right">
                <div class="FM1">
                    <div class="header bwhite">
                        <div class="cdark flexR">
                            <button className="btn bdark">
                                <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                            </button>
                            <h2 className="  pl0 aiE fBebasNeue">Form Entri Anggota</h2>
                        </div> 
                    </div>
                    <div class="body bdark pwrap-5" style={{width:"unset"}}><br/>
                        <div className="Flex-b250" >
                            <div className="list doubleInput ptb10px ">
                                <label>Name</label>
                                <div className="iconInput2 ">
                                    <input className="borderR10px" type="text" ref={fokus} value={name} onChange={_name} placeholder="M. Hanif Abdurrahman" />
                                    <span className={`mdi mdi-account-box ${(form.add == 1 ? 'cprimary': 'cwarning')} `}></span>
                                </div>
                            </div>
                            <div className="list doubleInput ptb10px ">
                                <label>Email</label>
                                <div className="iconInput2 ">
                                    <input className="borderR10px" type="email"  value={email} onChange={_email} placeholder="bagus@mfc.com" />
                                    <span className={`mdi mdi-email ${(form.add == 1 ? 'cprimary': 'cwarning')} `}></span>
                                </div>
                            </div>
                            <div className="list doubleInput ptb10px ">
                                <label>Password</label>
                                <div className="iconInput2 ">
                                    <input className="borderR10px" type="password"  value={pass} onChange={_pass} placeholder="81is000***" />
                                    <span className={`mdi mdi-account-key ${(form.add == 1 ? 'cprimary': 'cwarning')} `}></span>
                                </div>
                            </div>
                        </div> 
                        <div className="list jcE">
                            {
                                (
                                    form.add == 1 ?
                                        <button class="btn bprimary" onClick={()=>actAnggota()}>Tambahkan</button>
                                    :
                                        <button class="btn bwarning" onClick={()=>formPerbarui()}>Perbarui</button>
                                )
                            }
                         </div>  
                    </div>
                </div> 

                <div class="FM1">
                    <div class="header bwhite">
                        <div class="cdark flexR">
                            <button className="btn bdark">
                                <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                            </button>
                            <h2 className="  pl0 aiE fBebasNeue">Undang Anggota</h2>
                        </div> 
                    </div>
                    <div class="body bdark pwrap-5" style={{width:"unset"}}><br/>
                        <div className="Flex-b250" >
                            <div className="list doubleInput ptb10px ">
                                <label>Email</label>
                                <div className="iconInput2 ">
                                    <input className="borderR10px" type="email" ref={fokus} value={nmAnggota} onChange={_nmAnggota} placeholder="hanif@mfc.com" />
                                    <span className={`mdi mdi-account-box cprimary `}></span>
                                </div>
                            </div> 
                        </div> 
                        <div className="list jcE">
                            <button class="btn bprimary" onClick={()=>actUndangAnggota()}>Undang</button> 
                        </div>  
                    </div>
                </div>    
            </div>
        </div>
        <ModalM
            children ={modalC} 
        ></ModalM>
    </>
    );
}

Anggota.PropTypes = {
    sub : PropTypes.number.isRequired
}
export default Anggota;
// function Anggota ({ sub }){
//     return (
//         <>
//             {
//                 (sub === 1 &&
//                     <>
//                         <div className="flexR">
//                             <button className="btn bdark">
//                                 <span className="mdi mdi-star-crescent cwarning fzXl"></span>
//                             </button>
//                             <h2 className=" pwrap_5p pl0 cdark aiE fBebasNeue">Form Anggota</h2>
//                         </div>
//                         <div className="bwhite pwrap-5 radius-10 mwrap__2p">
//                             *Profil User
//                         </div>
//                     </>
//                 )
//             }
//         </>
//     );
// }