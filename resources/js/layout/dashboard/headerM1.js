import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";

import { userMenuS, logout } from "../../states/sf/html/action"

function HeaderM1(){
    const { _html } = useSelector((state) => state);
    const dispatch = useDispatch();
    const updMenu =({ v, sub })=>{
        dispatch(userMenuS({v,sub}))
    }
    
    return (
        <div className="Mcontainer bhijauBlueG">
            {/* <div className="flexR aiC">
                    <img src="/mfc1.png" height={"80px"}/>
                    <label className="tbold fzL2 fcookie cdark">CT</label>
            </div> */}
            <a class="navbar-brand fpacifico tbold fzXl aiC cdark" href="{{ url('/') }}">
                <u>Catatan Turunan</u>
            </a>
            <div className="left flexR ">
                
                <ul className="ul-menu1 aiC">
                    <li>
                        <div className="textIcon">
                            <Link to={`/home`} className="btn  " style={{flexDirection:"column"}} onClick={()=>updMenu({v:1,sub:1})}>
                                <span className="mdi mdi-view-dashboard"></span>
                                <label>Dashboard</label>
                            </Link>
                        </div>

                    </li>
                    <li>
                        <div className="textIcon">
                            <Link to={`/anggota`} className="btn  " style={{flexDirection:"column"}} onClick={()=>updMenu({v:2,sub:1})}>
                                <span className="mdi mdi-account-box-multiple"></span>
                                <label>Anggota</label>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className="textIcon">
                            <Link to={`/sharing`} className="btn   " style={{flexDirection:"column"}} onClick={()=>updMenu({v:3,sub:1})}>
                                <span className="mdi mdi-web"></span>
                                <label>Sharing</label>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className="textIcon">
                            <Link to={`/noted`} className="btn   " style={{flexDirection:"column"}} onClick={()=>updMenu({v:4,sub:1})}>
                                <span className="mdi mdi-terraform"></span>
                                <label>Noted</label>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className="textIcon">
                            <Link to={`/publikasi`} className="btn   " style={{flexDirection:"column"}} onClick={()=>updMenu({v:4,sub:1})}>
                                <span className="mdi mdi-terraform"></span>
                                <label>Publikasi</label>
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="right aiC jcE" style={{width:"300px"}}>
                <ul className="ul-menu1 " >
                    <li>
                        <button className="btn flexR cinfo " onClick={()=>logout()}>
                            <span className="mdi mdi-information-outline "></span>
                            <label>*</label>
                        </button>  
                    </li>
                    <li>
                        <button className="btn flexR  cwarning  " onClick={()=>logout()}>
                            <span className="mdi mdi-message-fast-outline"></span>
                            <label>*</label>
                        </button> 
                    </li>
                    <li> 
                        <button className="btn bdark" onClick={()=>logout()}>
                            <span className="mdi mdi-login-variant cdanger" style={{fontSize:"25px"}}></span>  
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default HeaderM1;
