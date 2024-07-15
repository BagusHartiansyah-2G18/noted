import api from "../../utils/api";
import { toast } from 'react-toastify';
const baseUrl = api.BASE_URL;
const actType = {
    _note: "_note", //_ set __get
     
};

function newDt(dt) {
    return {
      type: actType.note,
      payload: dt,
    };
}
function note(v) {
  return async (dispatch) => {
      // dispatch(showLoading());
      try {
        const dt = await api.POST({url:"judul", body:v}); 
        dispatch(newDt(dt));
      } catch (error) {
        toast(error.message);
      }
      // dispatch(hideLoading());
  };
} 
export {
  actType,
  note, 
  
}