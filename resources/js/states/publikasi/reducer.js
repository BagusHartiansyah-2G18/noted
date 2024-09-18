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
      case actType.__notedSharing: 
        const { dpublik,dkategori: realKet } =  action.payload; 
        const dkategori =  realKet.map(v=>{ return (v.data.length>20?JSON.parse(atob(v.data)):[])}); 
        return {
          ...dt,
          dkategori,
          dpublik:dpublik.map((v,i)=>{
            const indOps = dkategori.findIndex(v1=>v1[1].label!='' && v.judul.search(v1[1].label)==1);    
            return {
              ...v,
              judul:(indOps<0?v.judul:v.judul.substring(dkategori[indOps][1].label.length)),
              indOps:(indOps<0?0:indOps)
            }
          })
        } 
      default:
        return dt;
    }
}

export default publikasiReducer;
