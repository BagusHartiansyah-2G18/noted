import api from "../../utils/api";
import { toast } from 'react-toastify';
const actType = {
    _note: "_note", //_ set __get
    note:"note",
    updNote:"updNote",
    delNote:"delNote",
    updNoteSub:'updNoteSub',
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
function noteSub(v) {
  return async (dispatch) => {
      // dispatch(showLoading());
      try {
        const dt = await api.POST({url:"judul/sub", body:v}); 
        dispatch(newDt(dt));
      } catch (error) {
        toast(error.message);
      }
      // dispatch(hideLoading());
  };
}
function _note(body) {
    return async (dispatch) => {
        // dispatch(showLoading());
        try {
          const dt = await api.POST({url:"judul/add", body});
          dispatch(newDt(dt));
          return 1;
        } catch (error) {
          toast(error.message);
        }
        // dispatch(hideLoading());
    };
}
function updNote(body) {
  return async (dispatch) => {
      // dispatch(showLoading());
      try {
        const dt = await api.POST({url:"judul/upd", body});
        if(body.tingkat==0){
          dispatch({
            type: actType.updNote,
            payload: body,
          });
        }else{
          dispatch({
            type: actType.updNoteSub,
            payload: body,
          });
        }
        return 1;
      } catch (error) {
        toast(error.message);
      }
      // dispatch(hideLoading());
  };
}
function delNote(body) {
  return async (dispatch) => {
      // dispatch(showLoading());
      try {
        const dt = await api.POST({url:"judul/del", body});
        dispatch({
          type: actType.updNote,
          payload: body,
        });
        return 1;
      } catch (error) {
        toast(error.message);
      }
      // dispatch(hideLoading());
  };
}
export {
  actType,
  note,_note,updNote,delNote,
  noteSub,

}