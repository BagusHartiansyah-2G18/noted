/* eslint-disable react/react-in-jsx-scope */
const sfmodal =(()=>{
    function form({ label, clsH='bdanger clight', children, mclose, cfooter ='posEnd' ,footer='' }){
        return (
            <div className="form1 bwhite">
                <div className={`header ${clsH}`}>
                    <h3>{label}</h3>
                    <div className="btnGroup">
                        <button className="btn2 bdark clight" onClick={mclose}>Close</button>
                    </div>
                </div>
                <div className="body">
                    {children}
                </div>
                {
                    (
                        footer!='' &&
                        (
                            <div className={`footer ${cfooter}`}>{footer}</div>
                        )
                    )
                }
            </div>
        );
    }
    function btn({ mclose, xadded, xupded, xdeled, btn }){
        return (
            <div className={`btnGroup`}>
                {(mclose!=undefined && <button className="btn2 bdark clight" onClick={mclose}>Close</button>)}
                {(xadded!=undefined && <button className="btn2 bprimary" onClick={xadded}>Tambahkan</button>)}
                {(xupded!=undefined && <button className="btn2 bwarning" onClick={xupded}>Perbarui</button>)}
                {(xdeled!=undefined && <button className="btn2 bdanger clight" onClick={xdeled}>Hapus</button>)}
                {(btn!=undefined && <button className={`btn2 ${btn.cls}`} onClick={btn.onClick}>{btn.text}</button>)}
            </div>
        )
    }
    return {
        form,
        btn,
    }
})();
export default sfmodal;
