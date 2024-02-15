import React from "react";

function ListIndukNote({ dt }){
    return (
        <ul>
            {
                dt.map((v,i)=>{
                    return(
                        <li className="flexR">
                            <label className="aiC pwrap__10 fzXl">{v.kdJudul}</label>
                            <div className="flexC">
                                <span className="fzl3 pm0">{v.judul}</span>
                                <span className="cmuted pm0">{v.ringkasan}</span>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}
export default ListIndukNote;