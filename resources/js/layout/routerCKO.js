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

import FormUpload from "../pages/nextSubNote/formUpload";
import FormEntri from "../pages/nextSubNote/formEntriData";
import FormPreview from "../pages/nextSubNote/formPreview";

//dashboard
function RouterCKO({ userMenu }){
    const sub = userMenu.sub;
    return (
        <Routes>
            <Route path="cko/formPreview/:value" element={<FormPreview sub={sub}/> } />
             
            <Route path="*" element={<FormPreview sub={sub}/> } />
        </Routes>
    );
}
export default RouterCKO;
