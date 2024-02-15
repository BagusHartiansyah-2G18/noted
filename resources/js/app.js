/* eslint-disable react/no-deprecated */

import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';

import store from './states';

// layout
import HeaderM1 from "./layout/dashboard/headerM1";
import MenuUserM1 from "./layout/dashboard/menuUserM1";


import RouterM from './layout/router';
import FooterM from './layout/footer';

import { htmlS, userMenuS } from "./states/sf/html/action"


function MyApp() {
    const { _html, dnote } = useSelector((state) => state);
    const dispatch = useDispatch(); 
    useEffect(() => { 
        dispatch(htmlS({
            userMenu : {
                v:4, //value
                sub:1 //sub menu
            }
        }))
        
    }, [dispatch]);
    const path= window.location.pathname;
    // console.log(path);
    if(Object.keys(_html).length==0){
        return "";
    }  
    return (
        <>
            <div className='bodyM'>
                {/* 2. loading*/}
                {/* <div className='minHeader'>
                    <HeaderM></HeaderM> 3. header
                    <div>
                        <h1>Make a list of your notes.</h1>
                        <h2><u><b className='fpacifico'>Derivative Notes</b> <i className='fBebasNeue'>"DN / CT"</i></u></h2>
                        <button className='btnRadius50 bprimary'>Sig In</button>
                        <button className='btnRadius50 bwarning'>Sig Up</button>
                    </div>
                </div> */}
                {/*<div> 4. container
                    <NavigationM></NavigationM> 4.1. navigation
                    <RouterM></RouterM> 4.2. isi
                </div> */}
                 {
                    (
                        (path == '/home' || (path.split('home/').length>1)) && 
                        <>
                            <HeaderM1></HeaderM1>
                            <MenuUserM1
                                userMenu={_html.userMenu}
                            ></MenuUserM1>
                        </>
                    )
                }
                <RouterM 
                    userMenu={_html.userMenu}
                    ></RouterM>
                {/* 5. toast*/}
                <FooterM></FooterM>{/* 6. footer*/}
            </div>

        </>
    );
}
export default MyApp;

if (document.getElementById('app')) {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <MyApp />
            </BrowserRouter>
        </Provider>
        , document.getElementById('app'));
}
