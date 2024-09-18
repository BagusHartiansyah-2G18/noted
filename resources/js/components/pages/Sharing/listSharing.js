import React from "react";
import { useDispatch,useSelector } from 'react-redux';

import {Link} from "react-router-dom";
import { userMenuS } from "../../../states/sf/html/action"

function ListSharing({ data, subJS=true }) { 
    const dispatch = useDispatch();
    const updMenu =({ v, sub, inode })=>{
        dispatch(userMenuS({v,sub, inode}))
    }

    const judul=(ft)=>{
        const split = ft.split(" ");  
        if(split.length==1){
            return ft;
        }
        return split.map(v=>String(v.substring(1,0)).toUpperCase());
    }

    const viewRingkasan=(row)=>{  
        if(row.indOps == 0){
            return row.ringkasan.substring(0,25);
        }
        if(row.indOps == 2 && row.ringkasan.length>5){
            return row.ringkasan.toString().split("\n")[0];  
        } 
        return "";
    } 
    return (
        <div className="gr_13 w90p">
            {
                data.map(v=>{
                    return (
                        <div className="blight radius-10">
                            <div className="mh80 aiC jcC binfo"><label className="fzL2 cwhite"><b>{judul(v.judul)}</b></label></div>
                            <p className="pwrap-5 boxShadow fzXl" style={{textAlign:"center"}}>
                                <b>{v.judul+"  "}</b> 
                                {viewRingkasan(v)}
                            </p>
                            <div className="flexR aiC jcSB">
                                <small className="btn cmuted">{v.dateS}</small>
                                <Link class="btn" to={(subJS?'/notedSub/':'/Pnoted/')+btoa(JSON.stringify({
                                        kdJudul:v.kdJudul,
                                        kdMember:v.kdMember,
                                        tingkat:v.tingkat,
                                        subJS,
                                    }))} onClick={()=>updMenu({v:5,sub:1})} title="Akses"> 
                                    <span className="mdi mdi-comment-arrow-right fzL4 csuccess"></span>
                                </Link>  
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default ListSharing;