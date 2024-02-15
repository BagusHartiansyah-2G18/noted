import { actType } from './action';
function notedReducer(dt = [], action = {}) {
    switch (action.type) {
      case actType.note:
        // console.log(action.payload);
        return action.payload
      case actType.updNote:
        return dt.map((v,i)=>{
          if(i === action.payload.find){
            return {
                ...v,
                judul:action.payload.judul,
                ringkasan:action.payload.ringkasan,
            }
          }
          return v;
        })
      case actType.updNoteSub:
        return {
          ...dt,
          sub:dt.sub.map((v,i)=>{
            if(i === action.payload.find){
              return {
                ...v,
                judul:action.payload.judul,
                ringkasan:action.payload.ringkasan,
              }
            }
            return v;
          })
        }
      default:
        return dt;
    }
}

export default notedReducer;
