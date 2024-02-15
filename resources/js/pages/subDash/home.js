import React from "react";
import PropTypes from "prop-types";
import { useState } from 'react';


function Homes ({ sub }){
    return (
        <>
            {
                (sub === 1 &&
                    <>
                        <div className="flexR">
                            <button className="btn bdark">
                                <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                            </button>
                            <h2 className=" pwrap_5p pl0 cdark aiE fBebasNeue">Informasi</h2>
                        </div>
                        <div className="bwhite pwrap-5 radius-10 mwrap__2p">
                            *Profil User
                        </div>
                    </>
                )
            }
            {
                (sub === 2 &&
                    <>
                        <div className="flexR">
                            <button className="btn bdark">
                                <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                            </button>
                            <h2 className=" pwrap_5p pl0 cdark aiE fBebasNeue">Iklan</h2>
                        </div>
                        <div className="bwhite pwrap-5 radius-10 mwrap__2p">
                            *Iklan
                        </div>
                    </>
                )
            }
            {
                (sub === 3 &&
                    <>
                        <div className="flexR">
                            <button className="btn bdark">
                                <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                            </button>
                            <h2 className=" pwrap_5p pl0 cdark aiE fBebasNeue">Grafik</h2>
                        </div>
                        <div className="bwhite pwrap-5 radius-10 mwrap__2p">
                            *Grafik
                        </div>
                    </>
                )
            }
        </>
    );
}
Homes.PropTypes = {
    sub : PropTypes.number.isRequired
}
export default Homes;
