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
        <ul className="pm0 scroll-800">
            {
                dt.map((v,i)=>{
                    // ${(i%2 == 0 ? 'bmuted clight':'')} 
                    return(
                        <li className={`flexR jcSB pwrap__5 borderB1`} style={{borderBottomColor:"#7a4606"}}>
                            <div className="flexR jcC cwhite">
                                <label className="aiC pwrap_10 cwarning tbold fzL3">{`[ `}<span className="fzXl">{i+1}</span>{` ]`}</label>
                                <div className="flexC  jcC ">
                                    <Link class="cwhite tbold" to={'/notedSub/'+btoa(JSON.stringify({
                                            kdJudul:v.kdJudul,
                                            kdMember:v.kdMember,
                                            tingkat:v.tingkat,
                                        }))} onClick={()=>updMenu({v:5,sub:1})} title="view more"> 
                                        <span>{v.judul}</span> 
                                    </Link> 
                                    <span className="clight pm0">{v.ringkasan}</span>
                                </div>
                            </div> 
                            <div id="dropdonwUl_">
                                <button class="dropdown-btn bmuted">
                                    <span>opsi</span>
                                    <span class={ (i<4 ? "arrow":" arrowTop")}></span>
                                </button>
                                <ul class={`dropdown-content ${ (i<4 ? "":"dcTop")} pwrap-5p`}>
                                    <li style={{"--delay": 1}} >
                                        <Link class="btn csuccess aiC tstart " target="_blank" to={'/Pnoted/'+btoa(JSON.stringify({
                                                kdJudul:v.kdJudul,
                                                kdMember:v.kdMember,
                                                tingkat:v.tingkat,
                                            }))} onClick={()=>updMenu({v:5,sub:1})} title="view more"> 
                                            <span className="mdi mdi-arrow-right-bold-circle"></span>
                                            Preview
                                        </Link>
                                    </li>
                                    <li style={{"--delay": 2}}>
                                        <button class="btn cwarning" onClick={()=>openFormPerbarui({i})} title="Perbarui">
                                            <span className="mdi mdi-lead-pencil"></span>
                                            Perbarui
                                        </button>
                                    </li>
                                    <li style={{"--delay": 3}}>
                                        <button class="btn cdanger" onClick={()=>delKonfir({i})} title="Hapus">
                                            <span className="mdi mdi-trash-can"></span>
                                            Hapus
                                        </button> 
                                    </li>
                                     
                                </ul>
                            </div> 
                        </li>
                    )
                })
            }
        </ul>
    )
}
export default ListNoted;