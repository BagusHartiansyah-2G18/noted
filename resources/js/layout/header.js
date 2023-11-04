import react from "react";
import NavigationM from './navigation';
import RouterM from './router';
function HeaderM(){
    return (
        <div className="headerM">
            <h1 className="fpacifico cwhite"><u>Catatan Turunan</u></h1>
            <div>
                <NavigationM></NavigationM>
            </div>
        </div>
    );
}
export default HeaderM;
