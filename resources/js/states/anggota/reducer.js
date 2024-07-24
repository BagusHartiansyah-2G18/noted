import { actType } from './action';
export default function anggotaReducer(dt = [], action = {}) {
    switch (action.type) {
      case actType.__anggota: 
        return action.payload;
      case actType.batalkanAnggota: 
        return dt.filter(v=>v.id == action.payload.id);
      case actType.terimaAnggota: 
        return dt.map(v=>{
          if(v.id == action.payload.id){
            return {
              ...v,
              status:1
            }
          }
          return v;
        });
      default:
        return dt;
    }
} 
