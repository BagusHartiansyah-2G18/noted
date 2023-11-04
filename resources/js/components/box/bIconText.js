import React from "react";
function BiconText({ ic, text, cb, borderBottom, judul }){
    return (
        <div className={`BiconText ${borderBottom}`}>
            <div className={`box ${cb}`}>
                <span className={`mdi ${ic} fzL6`}></span>
            </div>
            <p className="mwrap__3p tjustify pwrap-10"> <b>{judul}</b> {text}</p>
        </div>
    )
}
export default BiconText;
