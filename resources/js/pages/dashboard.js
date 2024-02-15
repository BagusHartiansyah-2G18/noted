import React,  { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import HeaderM1 from "../layout/dashboard/headerM1";
import MenuUserM1 from "../layout/dashboard/menuUserM1";

import Home from "./subDash/home";
import Anggota from "./subDash/anggota";
import Publikasi from "./subDash/publikasi";
import Noted from "./subDash/noteForm";

import { note } from "../states/noted/action";


import { htmlS, userMenuS } from "../states/sf/html/action"
import _ from "lodash";

// import Anggota from './subDash/anggota';
// import Home from './subDash/home';

function Dashboard (){
    const { _html, dnote } = useSelector((state) => state);
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(note({
            tingkat:0
        }))
        dispatch(htmlS({
            userMenu : {
                v:4, //value
                sub:1 //sub menu
            }
        }))
        
    }, [dispatch]);

    // if(Object.keys(_html).length==0){
    //     return '';
    // }
    // console.log(dnote);
    return (
        <>
            <HeaderM1></HeaderM1>
            <MenuUserM1
                userMenu={{}}
            ></MenuUserM1>
            <div className="w90p mauto">
                <Routes>
                    <Route path="home/" element={<Home /> } /> 
                    <Route path="home/anggota" element={<Anggota /> } /> 
                </Routes>
                {/* {
                    (_html.userMenu.v === 1) &&
                    <Home
                        sub={_html.userMenu.sub}
                    ></Home>
                }{
                    (_html.userMenu.v === 2) &&
                    <Anggota
                        sub={_html.userMenu.sub}
                    ></Anggota>
                }{
                    (_html.userMenu.v === 3) &&
                    <Publikasi
                        sub={_html.userMenu.sub}
                    ></Publikasi>
                }{
                    (_html.userMenu.v === 4) &&
                    <Noted
                        dnote={dnote}
                        // userMenu={_html.userMenu}
                        userMenu={{ sub:2, inode:0}}

                    ></Noted>
                } */}
            </div>
        </>
    )
}
export default Dashboard;
