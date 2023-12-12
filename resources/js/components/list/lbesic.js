import React from "react";
function Lbesic({ data }){
    return (
        <ul className="tbold">
            {
                data.map((v,i)=>{
                    return (
                        <li key={i}>{v}</li>
                    )
                })
            }
        </ul>
    )
}

export default Lbesic;
