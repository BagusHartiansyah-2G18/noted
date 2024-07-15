import React,  { useEffect,useRef   } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { userMenuS } from "../states/sf/html/action";   

function ErrorP({}) {
    const dispatch = useDispatch(); 
    useEffect(() => { 
        dispatch(userMenuS({v:46,sub:1, isi:''})); 
    }, [dispatch]);
    return '';
}
export default ErrorP;