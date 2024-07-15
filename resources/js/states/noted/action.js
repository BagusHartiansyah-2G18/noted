import api from "../../utils/api";
import { toast } from 'react-toastify';
const baseUrl = api.BASE_URL;
const actType = {
    _note: "_note", //_ set __get
    note:"note",
    updNote:"updNote",
    delNoteInduk:"delNoteInduk",
    delNote:"delNote",
    updNoteSub:'updNoteSub',

    actUFSubNote:"actUFSubNote",
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
function noteSubFileUpload(v) {
  return async (dispatch) => {
      // dispatch(showLoading());
      try {
        const dt = await api.POST({url:"judul/subFileUpload", body:v}); 
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
          type: actType.delNote,
          payload: body,
        }); 
      } catch (error) {
        toast(error.message);
      }
      // dispatch(hideLoading());
  };
}
function delNoteInduk(body) {
  return async (dispatch) => { 
      try {
        const dt = await api.POST({url:"judul/del", body});
        dispatch({
          type: actType.delNoteInduk,
          payload: body,
        }); 
      } catch (error) {
        toast(error.message);
      }
      // dispatch(hideLoading());
  };
}

function actUFSubNote(body){
  return async (dispatch) => {
    // dispatch(showLoading());
    try {
      const fileD = await api.POST({url:"judul/actUFSubNote",body});
      dispatch({
        type : actType.actUFSubNote,
        payload:{
          fileD
        }
      });
    } catch (error) {
      // alert(error.message);
    }
    // dispatch(hideLoading());
  };
}
export {
  actType,
  note,_note,updNote,delNote,
  noteSub,noteSubFileUpload,
  actUFSubNote, 
  delNoteInduk,
  baseUrl
  
}