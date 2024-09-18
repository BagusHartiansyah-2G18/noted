import api from "../../utils/api";
import { toast } from 'react-toastify';
const baseUrl = api.BASE_URL;
const actType = {
  _note: "_note", //_ set __get 
  updPublikasi:"updPublikasi",
  noteSubLangsung:"noteSubLangsung",
  __notedSharing:"__notedSharing",

  
};

function newDt(dt) {
    return {
      type: actType.note,
      payload: dt,
    };
}
async function updJenisSharing(v) {
  try {
    const dt = await api.POST({url:"publikasi/updJenisSharing", body:v}); 
    toast.success("Berhasil Memperbarui Data ");
  } catch (error) {
    toast(error.message);
  }
} 
async function _anggotaSharing(v) {
  try {
    const dt = await api.POST({url:"publikasi/setAnggota", body:v}); 
    toast.success("Berhasil Memperbarui Data ");
  } catch (error) {
    toast(error.message);
  }
}  
function updPublikasi(v) {
  return async (dispatch) => {
    try {
      const dt = await api.POST({url:"publikasi/updPublikasi", body:v}); 
      toast.success("Berhasil Memperbarui Data ");
      dispatch({
        type: actType.updPublikasi,
        payload: v,
      });
    } catch (error) {
      toast(error.message);
    }
  }
  
} 
function __notedSharing(){
  return async (dispatch) => {
    try {
      const dt = await api.POST({url:"publikasi/getNoteSharing"}); 
      dispatch({
        type: actType.__notedSharing,
        payload: dt,
      });
    } catch (error) {
      toast(error.message);
    }
  }
}
function __notedSharingPublic(){
  return async (dispatch) => {
    try {
      const dt = await api.POST({url:"publikasi/getNoteSharingPublic"}); 
      dispatch({
        type: actType.__notedSharing,
        payload: dt,
      });
    } catch (error) {
      toast(error.message);
    }
  }
}

function noteSubLangsung(v) {
  return async (dispatch) => {
      // dispatch(showLoading());
      try {
        const dt = await api.POST({url:"judul/sub", body:v}); 
        dispatch({
          type: actType.noteSubLangsung,
          payload: dt,
        });
      } catch (error) { 
        
        toast(error.message);
      }
      // dispatch(hideLoading());
  };
}
export {
  actType,
  updJenisSharing, 
  updPublikasi,
  _anggotaSharing,
  noteSubLangsung,

  __notedSharing,
  __notedSharingPublic
}