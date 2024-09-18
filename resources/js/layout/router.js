import react from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from '../pages/home';
import Homes from '../pages/subDash/home';
import Anggota from '../pages/subDash/anggota';
import Noted from '../pages/subDash/noteForm';
import NoteSub from '../pages/subDash/noteFormSub';
import Sharing from '../pages/subDash/sharing';
import Publikasi from '../pages/subDash/publikasi';
import ErrorP from '../pages/error';
import Pnoted from "../pages/publikasi/Pnoted";

import PEnoted from "../pages/pengaturan/PEnoted";
import PEformEntri from "../pages/pengaturan/PEformEntri";



import FormUpload from "../pages/nextSubNote/formUpload";
import FormEntri from "../pages/nextSubNote/formEntriData";
import FormPreview from "../pages/nextSubNote/formPreview";

//dashboard
function RouterM({ userMenu }){
    const { sub } = userMenu;
    return (
        <Routes>
            <Route path="/home" element={<Homes sub={sub}/> } />
            
            <Route path="/anggota" element={<Anggota sub={sub} /> } />
            <Route path="/sharing" element={<Sharing /> } />
            <Route path="/publikasi" element={<Publikasi /> } />
            <Route path="/noted" element={<Noted /> } /> 
            <Route path="/notedSub/:value" element={<NoteSub /> } />  

            <Route path="/fu-sub/:value" element={<FormUpload /> } /> 
            <Route path="/fe-sub/:value" element={<FormEntri /> } /> 

            <Route path="/formPreview/:value" element={<FormPreview /> } />  
            <Route path="/Pnoted/:value" element={<Pnoted /> } /> 

            <Route path="/pe-noted/:value" element={<PEnoted /> } /> 
            <Route path="/pe-export/:value" element={<Pnoted /> } /> 
            <Route path="/Pe-formentri/:value" element={<PEformEntri /> } />   

            <Route path="/" element={<Home /> } />
            <Route path="*" element={<ErrorP /> } />
        </Routes>
    );
}
export default RouterM;
