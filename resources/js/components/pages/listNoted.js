import React from "react";
import { useDispatch,useSelector } from 'react-redux';

import Bicon3coll from '../../components/box/bicon3coll';
import {Link} from "react-router-dom";
import { userMenuS } from "../../states/sf/html/action"

function ListNoted({ dt, openFormPerbarui, delKonfir }){
    const dispatch = useDispatch();
    const updMenu =({ v, sub, inode })=>{
        dispatch(userMenuS({v,sub, inode}))
    }
    return (
        <div className="listNode bwhite pwrap-5 radius-10 mwrap__2p boxShadow bwhite pwrap__3p">
            {
                dt.map((v,i)=>{
                    // onClick={()=> selectMenuSub({menuSub:'dashboard'})}
                    return(
                        <div className="flexC" key={i}>
                                <Bicon3coll
                                    cls="blight pointer"
                                    val={{
                                        judul:v.judul,
                                        ket: v.ringkasan
                                    }}
                                    btn={
                                        <div className="flexR jcC">
                                            <button class="btn bwarning" onClick={()=>openFormPerbarui({i})} title="Perbarui"><span className="mdi mdi-lead-pencil"></span></button>
                                            <button class="btn bdanger" onClick={()=>delKonfir({i})} title="Hapus"><span className="mdi mdi-trash-can"></span></button>
                                            <Link class="btn bsuccess" to={'/home/notedSub/'+btoa(JSON.stringify({
                                                    kdJudul:v.kdJudul,
                                                    kdMember:v.kdMember,
                                                    tingkat:v.tingkat,
                                                }))} onClick={()=>updMenu({v:5,sub:1})} title="view more"> 
                                                <span className="mdi mdi-arrow-right-bold-circle"></span> 
                                            </Link>
                                        </div>
                                    }
                                ></Bicon3coll>
                           
                            
                        </div>
                    )
                })
            }
        </div>
    )
}
export default ListNoted;