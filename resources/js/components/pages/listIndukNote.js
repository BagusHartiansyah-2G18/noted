import React from "react";

function ListIndukNote({ dt, back }){
    return (
        <ul className="pm0">
            {
                dt.map((v,i)=>{
                    return(
                        <li className="flexR">
                            <label className="aiC pwrap_10 cwarning tbold fzL3">{`[ `}<span className="fzXl clight">{i+1}</span>{` ]`}</label>
                            <div className="flexC">
                                <span className=" fzXl pm0 btn tstart  cprimary " onClick={()=>back(i)}>{v.judul}</span>
                                <span className="clight pm0">{(v.indOps == 0 ? v.ringkasan : '')}</span>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}
export default ListIndukNote;