import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';

import Home from "../../pages/subDash/home";

function DashM1({ userMenu }){
    return (
        <div>
            {headerM1()}
            {userInfo()}
            <div>

            </div>
        </div>

    )
}
DashM1.propTypes = {
    userMenu : PropTypes.object.isRequired,
}
export default DashM1;
