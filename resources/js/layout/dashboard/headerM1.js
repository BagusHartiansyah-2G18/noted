import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";

import { userMenuS } from "../../states/sf/html/action"

function HeaderM1(){
    const dispatch = useDispatch();
    const updMenu =({ v, sub })=>{
        dispatch(userMenuS({v,sub}))
    }
    return (
        <div className="headerM1">
            <div className="wrap">
                <ul>
                    <li>
                        <div className="textIcon">
                            <Link to={`/home`} className="btn" onClick={()=>updMenu({v:1,sub:1})}>
                                <span className="mdi mdi-view-dashboard"></span>
                                <label>Dashboard</label>
                            </Link>
                        </div>

                    </li>
                    <li>
                        <div className="textIcon">
                            <Link to={`/home/anggota`} className="btn" onClick={()=>updMenu({v:2,sub:1})}>
                                <span className="mdi mdi-account-box-multiple"></span>
                                <label>Anggota</label>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className="textIcon">
                            <Link to={`/home/publikasi`} className="btn" onClick={()=>updMenu({v:3,sub:1})}>
                                <span className="mdi mdi-web"></span>
                                <label>Publikasi</label>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className="textIcon">
                            <Link to={`/home/noted`} className="btn" onClick={()=>updMenu({v:4,sub:1})}>
                                <span className="mdi mdi-terraform"></span>
                                <label>Noted Form</label>
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="wrap">
                <ul className="jcE">
                    <li>
                        <span className="mdi mdi-information-outline "></span>
                        <label>*</label>
                    </li>
                    <li>
                        <span className="mdi mdi-message-fast-outline"></span>
                        <label>*</label>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default HeaderM1;
