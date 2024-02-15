import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';

import { userMenuS } from "../../states/sf/html/action"
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
                <Link className="btn blight borderTInfo-5" to={`/home/noted`}><b>Form Noted</b></Link>
                <button className="btn blight borderTInfo-5" ><b>List Noted</b></button>
            </div>
        )
    }
    return (
        <div className="userInfo">
            <div id="ui_bg">
                <label>Background Profil</label>
            </div>
            <div className="boxProfil ">
                <div id="ui_profil">
                    <div id="profil">
                        <img src="/svg/dev-mini.png"/>
                        <div className="flexC jcC mwrap_3p">
                            <label className="tbold fPoppins">Bagus Hartiansyah</label>
                            <label className="">Manajer MFC</label>
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
        </div>
    )
}
MenuUserM1.prototype = {
    userMenu: PropTypes.object.isRequired,
    // updMenu : PropTypes.func.isRequired,
}
export default MenuUserM1;
