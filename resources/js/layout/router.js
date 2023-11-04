import react from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from '../pages/home';


function RouterM(){
    return (
        <Routes>
            <Route path="/home/dashboard" element={<Home /> } />
            <Route path="*" element={<Home /> } />
        </Routes>
    );
}
export default RouterM;
