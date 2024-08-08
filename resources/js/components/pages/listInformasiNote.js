
import React from "react";
import Tabel1 from "../tabel/tabel1";

function ListInformasiNote({ dinduk ,changeSub }) {
    const colNoted = [
        {
          name: 'No',
          selector: (row,i) => <><label className="aiC pwrap_10 cwarning tbold fzL3">{`[ `}<span className="fzXl cdark">{i+1}</span>{` ]`}</label></>,
          width : '100px'
        }
        ,{
            name: 'Judul',
            selector: row =>vjudul(row),
        }, 
    ];
    const vjudul=(row)=>{
        return(
            <>
                {/* <button class="btn fzXl pm0 cprimary" onClick={()=>changeSub({...row})} title="Access">
                    {row.judul}
                </button>  */}
                <span className="fzXl">{row.judul}</span> 
                <br/><label className="cmuted">{row.ringkasan}</label>
            </>
        )
    }
    
    return (
        <div className="  ">
            <Tabel1 
                columns={colNoted}
                data={dinduk}
            ></Tabel1>
        </div>
    )
}
export default ListInformasiNote;