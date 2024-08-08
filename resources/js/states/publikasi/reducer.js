import { actType } from './action';
function publikasiReducer(dt = [], action = {}) {
    switch (action.type) {
      case actType.noteSubLangsung: 
        return { 
          ...action.payload,
          induk:{
            ...action.payload.induk,
            dpCatatan:JSON.parse(atob(action.payload.induk.dpCatatan))
          } 
        }
      case actType.updPublikasi: 
        return {
          ...dt,
          induk:{
            ...dt.induk,
            dpCatatan:JSON.parse(atob(action.payload.dpCatatan))
          }
        }
      default:
        return dt;
    }
}

export default publikasiReducer;
