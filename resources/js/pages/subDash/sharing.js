import React,  { useEffect,useRef,useState    }  from "react";
import { useDispatch,useSelector } from 'react-redux';
import { useInput } from '../../hooks/useInput';

import PropTypes from "prop-types";
import { userMenuS } from "../../states/sf/html/action"  
import {  _anggotaSharing, __notedSharing } from "../../states/publikasi/action";

import ListSharing from "../../components/pages/Sharing/listSharing";

function Sharing ({  }){
    const { pubN } = useSelector((state) => state); 

    const dispatch = useDispatch(); 
    const [search, _search] = useInput('');

    useEffect(() => { 
        dispatch(userMenuS({v:3,sub:2, isi:''}));  
        dispatch(__notedSharing());  
    }, [dispatch]);

    if(Object.keys(pubN).length==0){
        return "";
    }
    const { dpublik } = pubN;  
    return (
        <>
            <div className="Mcontainer  bdark aiC " style={{justifyContent:"space-between", padding:"5% 10% 5% 10%"}}>
                <div>
                    <span className="mdi mdi-microsoft-sharepoint fzL6"></span>
                    <label>
                        <b className="fzXl">Berbagi Catatan</b> <br/>
                        Bersama Saling Melengkapi
                    </label>
                </div>
                <div className="iconInput2 w40p">
                    <input className="borderR10px" type="text" placeholder="Pencarian Judul Note" value={search} onChange={_search} style={{padding:"10px 30px;"}}></input>
                    <span className="mdi mdi-cloud-search "></span>
                </div>
            </div>
            <div className="Mcontainer">
                <ListSharing
                    data={dpublik.filter((v,i)=>{
                        if (search === "") {
                            return {...v, i};
                        } else if (
                            v.judul.toLowerCase().includes(search.toLowerCase()) || v.ringkasan.toLowerCase().includes(search.toLowerCase())
                        ) {
                            return {...v, i};
                        }
                    })} 
                ></ListSharing> 
            </div> 
        </>
    );
}
// Sharing.PropTypes = {
//     sub : PropTypes.number.isRequired
// }
export default Sharing;
