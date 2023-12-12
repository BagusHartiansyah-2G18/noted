import react from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from '../pages/home';
import Dashboard from '../pages/dashboard';


function RouterM(){
    return (
        <Routes>
            <Route path="/home" element={<Dashboard /> } />
            <Route path="*" element={<Home /> } />
        </Routes>
    );
}
export default RouterM;
