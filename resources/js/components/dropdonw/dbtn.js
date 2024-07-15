import { useRef } from "react";
import { useState } from 'react';
import { useOutsideClick } from "../../utils/useOutsideClick";

function Dropdown({btn,dbtn}) {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

    return (
        <div className="dropdown__container"> 
            <div className="dropdown__btn" onClick={onClick}>
                <label>{btn}</label>
            </div> 
        <div ref={dropdownRef} className={`dropdown__content ${isActive ? "active" : "inactive"}`}>
            <div className="dropdown__info">
                <ul>
                    {
                        dbtn.map((v,i)=>{
                            return(
                                <li key={i}>
                                    {v}
                                </li>
                            )
                        })
                    } 
                    {/* <li>
                        <button type="button">Sign Out</button>
                    </li> */}
                </ul>
            </div>
            </div>
        </div>
        
    )
}
export default Dropdown;
{/* <Dropdown
    btn="Action"
    dbtn={[
        <button class="btn bwarning" onClick={()=>openFormPerbarui(row)} title="Perbarui"><span className="mdi mdi-lead-pencil"></span></button>,
        <button class="btn bdanger" onClick={()=>delKonfir(row)} title="Hapus"><span className="mdi mdi-trash-can"></span></button>,
        <button class="btn bsuccess" onClick={()=>changeSub({...row})} title="Access">,
            <span className="mdi mdi-arrow-right-bold-circle"></span>     
        </button>
    ]}
></Dropdown> */}