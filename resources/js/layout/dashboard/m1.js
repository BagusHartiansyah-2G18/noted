import React from "react";


const headerM1=()=>{
    return (
        <div className="headerM1">
            <div className="wrap">
                <ul>
                    <li>
                        <div className="textIcon">
                            <span className="mdi mdi-view-dashboard"></span>
                            <label>Dashboard</label>
                        </div>
                    </li>
                    <li>
                        <div className="textIcon">
                            <span className="mdi mdi-account-box-multiple"></span>
                            <label>Anggota</label>
                        </div>
                    </li>
                    <li>
                        <div className="textIcon">
                            <span className="mdi mdi-web"></span>
                            <label>Publikasi</label>
                        </div>
                    </li>
                    <li>
                        <div className="textIcon">
                            <span className="mdi mdi-terraform"></span>
                            <label>Noted Form</label>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="wrap">
                <ul className="jcE">
                    <li>
                        <span className="mdi mdi-information-outline "></span>
                        <label>*</label>
                    </li>
                    <li>
                        <span className="mdi mdi-message-fast-outline"></span>
                        <label>*</label>
                    </li>
                </ul>
            </div>
        </div>
    )
}
const userInfo=()=>{
    return (
        <div className="userInfo">
            <div id="ui_bg">
                <label>Background Profil</label>
            </div>
            <div className="positionR-b40 radius-10 pwrap-2p bwhite w90p mauto">
                <div id="ui_profil">
                    <div id="profil">
                        <img src="/svg/dev-mini.png"/>
                        <div className="flexC jcC">
                            <label>Bagus Hartiansyah</label>
                            <label>Manajer MFC</label>
                        </div>
                    </div>
                    <div id="menu">sasa</div>
                </div>
            </div>
        </div>
    )
}

function DashM1(){
    return (
        <div>
            {headerM1()}
            {userInfo()}
            <div>

                <div>
                </div>
            </div>
        </div>

    )
}
export default DashM1;
