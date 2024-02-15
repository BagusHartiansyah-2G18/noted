import React from "react";
import PropTypes from "prop-types";


function Publikasi ({ sub }){
    return (
        <>
            {
                (sub === 1 &&
                    <>
                        <div className="flexR">
                            <button className="btn bdark">
                                <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                            </button>
                            <h2 className=" pwrap_5p pl0 cdark aiE fBebasNeue">Form Publikasi</h2>
                        </div>
                        <div className="bwhite pwrap-5 radius-10 mwrap__2p">
                            *Profil User
                        </div>
                    </>
                )
            }
        </>
    );
}
Publikasi.PropTypes = {
    sub : PropTypes.number.isRequired
}
export default Publikasi;
