import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';

import { userMenuS,logout } from "../../states/sf/html/action"
import { Link } from "react-router-dom";
 
function MenuUserM1({ userMenu }) {
    const dispatch = useDispatch();
    const updMenu =({ v, sub })=>{
        dispatch(userMenuS({v,sub}))
    }
    const menuHome =()=>{
        return(
            <div className="acC grid-col3 ">
                <button className="btn blight borderTInfo-5" onClick={()=>updMenu({v:1,sub:1})}><b>Informasi</b></button>
                <button className="btn blight borderTInfo-5" onClick={()=>updMenu({v:1,sub:2})}><b>Iklan</b></button>
                <button className="btn blight borderTInfo-5" onClick={()=>updMenu({v:1,sub:3})}><b>Grafik</b></button>
            </div>
        )
    }
    const menuAnggota =()=>{
        return(
            <div className="acC">
                <button className="btn blight borderTInfo-5" onClick={()=>updMenu({v:2,sub:1})}><b>Form Anggota</b></button>
            </div>
        )
    }
    const menuPublikasi =()=>{
        return(
            <div className="acC">
                <button className="btn blight borderTInfo-5" onClick={()=>updMenu({v:3,sub:1})}><b>Form Publikasi</b></button>
            </div>
        )
    }
    const menuNoted =()=>{
        return(
            <div className="acC">
                <Link className="btn blight borderTInfo-5" to={`/noted`}><b>Form Noted</b></Link>
                <button className="btn blight borderTInfo-5" ><b>List Noted</b></button>
            </div>
        )
    }  
    return ( 
        <div className="userInfo">
            {
                userMenu.v == 1 ?
                <>
                    {/* style={{backgroundImage:"url('./bgBook1.jpg')", backgroundSize:"cover"}} style={{opacity:"0.4"}}*/} 
                    <div id="ui_bg" className="bdark" >
                        <label>Background Profil</label>
                    </div> 
                    <div>
                    <div className="boxProfil ">
                        <div id="ui_profil">
                            <div id="profil">
                                <img src="/svg/dev-mini.png"/>
                                <div className="flexC jcC mwrap_3p">
                                    <label className="tbold fPoppins">{userMenu.name}</label>
                                    <label className="">{userMenu.email}</label>
                                </div>
                            </div> 
                            <div id="logout"> 
                                <button className="btn flexR cinfo " onClick={()=>logout()}>
                                    <span className="mdi mdi-information-outline "></span>
                                    <label>*</label>
                                </button>   
                                <button className="btn flexR  cwarning  " onClick={()=>logout()}>
                                    <span className="mdi mdi-message-fast-outline"></span>
                                    <label>*</label>
                                </button>  
                                <button className="btn bdark" onClick={()=>logout()}>
                                    <span className="mdi mdi-login-variant cdanger" style={{fontSize:"25px"}}></span>  
                                </button>
                            </div>
                        </div>
                        <div id="menu">
                                {
                                    (userMenu.v === 1 ) && menuHome()
                                }
                                {
                                    (userMenu.v === 2) && menuAnggota()
                                }
                                {
                                    (userMenu.v === 3) && menuPublikasi()
                                }
                                {
                                    (userMenu.v === 4) && menuNoted()
                                }
                            </div>
                    </div>
                    </div>
                </>:
                (
                    userMenu.sub == 555 ?
                    <div id="ui_bg">
                        <label>URL Error,</label>
                    </div> :''
                )
            }
        </div>
    ) 
}
MenuUserM1.prototype = {
    userMenu: PropTypes.object.isRequired,
    // updMenu : PropTypes.func.isRequired,
}
export default MenuUserM1;
