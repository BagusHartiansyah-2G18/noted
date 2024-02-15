import react from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from '../pages/home';
import Homes from '../pages/subDash/home';
import Anggota from '../pages/subDash/anggota';
import Noted from '../pages/subDash/noteForm';
import NoteSub from '../pages/subDash/noteFormSub';
import Publikasi from '../pages/subDash/publikasi';

//dashboard
function RouterM({ userMenu }){
    const sub = userMenu.sub;
    return (
        <Routes>
            <Route path="/home" element={<Homes sub={sub}/> } />
            
            <Route path="/home/anggota" element={<Anggota sub={sub} /> } />
            <Route path="/home/publikasi" element={<Publikasi sub={sub}/> } />
            <Route path="/home/noted" element={<Noted /> } /> 
            <Route path="/home/notedSub/:value" element={<NoteSub /> } />  

            <Route path="*" element={<Home /> } />
        </Routes>
    );
}
export default RouterM;
