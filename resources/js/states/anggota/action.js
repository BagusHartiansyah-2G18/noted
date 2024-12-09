import api from "../../utils/api";
import { toast } from 'react-toastify';
const baseUrl = api.BASE_URL;
const actType = {
  __anggota: "__anggota", //_ set __get
  batalkanAnggota:"batalkanAnggota",
  terimaAnggota:"terimaAnggota",
     
}; 
function _anggota(v) {
  return async (dispatch) => {
      // dispatch(showLoading());
      try {
        const dt = await api.POST({url:"anggota/userSetter", body:v}); 
        dispatch({
          type: actType.__anggota,
          payload: dt,
        });
      } catch (error) {
        toast(error.message);
      }
      // dispatch(hideLoading());
  };
}
function __anggota() {
  return async (dispatch) => {
      // dispatch(showLoading());
      try {
        const dt = await api.POST({url:"anggota/userGetter"}); 
        dispatch({
          type: actType.__anggota,
          payload: dt,
        });
      } catch (error) {
        toast(error.message);
      }
      // dispatch(hideLoading());
  };
} 
function undangAnggota(v) {
  return async (dispatch) => {
      // dispatch(showLoading());
      try {
        const dt = await api.POST({url:"anggota/userUndang", body:v}); 
        dispatch({
          type: actType.__anggota,
          payload: dt,
        });
      } catch (error) {
        toast(error.message);
      }
      // dispatch(hideLoading());
  };
}
function batalkanAnggota(v) {
  return async (dispatch) => {
      // dispatch(showLoading());
      try {
        const dt = await api.POST({url:"anggota/batalkanAnggota", body:v}); 
        dispatch({
          type: actType.batalkanAnggota,
          payload: v,
        });
      } catch (error) {
        toast(error.message);
      }
      // dispatch(hideLoading());
  };
}
function terimaAnggota(v) {
  return async (dispatch) => {
      // dispatch(showLoading());
      try {
        const dt = await api.POST({url:"anggota/terimaAnggota", body:v}); 
        dispatch({
          type: actType.terimaAnggota,
          payload: v,
        });
      } catch (error) {
        toast(error.message);
      }
      // dispatch(hideLoading());
  };
}
export {
  actType,
  _anggota, 
  __anggota,
  undangAnggota,
  batalkanAnggota,
  terimaAnggota,
}