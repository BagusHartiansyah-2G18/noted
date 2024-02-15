import React from "react";
function Bicon3coll({ 
        ic="mdi-book-search", 
        img='' , clsbox='', cls="", 
        val={
            judul:"Agama",
            ket:"Islam"
        },
        btn
    }){
    return (
        <div className={`Bicon3coll ${cls}`} >
            <div className="flexR">
                <div className={`box ${clsbox}`}>
                    {
                        (
                            img!='' ?
                            <img src={img}/>
                            :
                            <span className={`mdi ${ic} fzL6`}></span>
                        )
                    }
                </div>
                <div className="judul">
                    <h2>{val.judul}</h2>
                    <small>{val.ket}</small>
                </div>
            </div>
            {btn}
        </div>
    )
}
export default Bicon3coll;