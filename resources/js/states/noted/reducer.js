import { actType } from './action';
function notedReducer(dt = [], action = {}) {
    switch (action.type) {
      case actType.newDtAwal:   
        return _newDtAwal({
          ...dt,
          ...action.payload
        });
      case actType.newDtAwalSub:
        const ftam = _newDtAwal({
          ...dt,
          ...action.payload
        });
        return {
          ...ftam,  
          sub:action.payload.sub.map(v=>{
              const indOps = ftam.dkategori.findIndex(v1=>v1.value!= "" && v.judul.search(v1.value)==1);  
              return {
                  ...v,
                  judul:(indOps<0?v.judul:v.judul.substring(ftam.dkategori[indOps].value.length)),
                  indOps:(indOps<0?0:indOps)
              }
          })
        }
      case actType.note: 
        return {
          ...dt, 
          induk:action.payload.map(v=>{
              const indOps = dt.dkategori.findIndex(v1=>v1.value!= "" && v.judul.search(v1.value)==1); 
              return {
                  ...v,
                  judul:(indOps<0?v.judul:v.judul.substring(dkategori[indOps].value.length)),
                  indOps:(indOps<0?0:indOps)
              }
          }) 
      }
      case actType.newDt: 
        return { ...action.payload}
      case actType._note: // add Sub noted
        // console.log(action.payload);
        return {
          ...dt, 
          ...action.payload,
          induk:action.payload.induk.map(v=>{
              const indOps = dt.dkategori.findIndex(v1=>v1.value!= "" && v.judul.search(v1.value)==1); 
              return {
                  ...v,
                  judul:(indOps<0?v.judul:v.judul.substring(dkategori[indOps].value.length)),
                  indOps:(indOps<0?0:indOps)
              }
          }) 
      }
      case actType.updNote:
        return {
          ...dt,
          induk:dt.induk.map((v,i)=>{
            if(i === action.payload.find){
              const indOps = dt.dkategori.findIndex(v1=>v1.value!= "" && action.payload.judul.search(v1.value)==1); 
              return {
                  ...v,
                  judul:(indOps<0?action.payload.judul:action.payload.judul.substring(dt.dkategori[indOps].value.length)), 
                  ringkasan:action.payload.ringkasan,
                  indOps:(indOps<0?0:indOps)
              }
            }
            return v;
          })
        }
      case actType.delNoteInduk:  
        return{
          ...dt,
          induk: dt.induk.filter((v1,i1)=> i1!=action.payload.index)
        };
      case actType.delNote:  
         return {
          ...dt,
          sub:dt.sub.filter((v1,i1)=> i1!=action.payload.index)
        };
        
      case actType.updNoteSub:
        return {
          ...dt,
          sub:dt.sub.map((v,i)=>{
            if(i === action.payload.find){
              const indOps = dt.dkategori.findIndex(v1=>v1.value!= "" && action.payload.judul.search(v1.value)==1); 
              return {
                ...v,
                judul:(indOps<0?action.payload.judul:action.payload.judul.substring(dt.dkategori[indOps].value.length)),
                ringkasan:action.payload.ringkasan,
                indOps:(indOps<0?0:indOps)
              }
            }
            return v;
          })
        }
      case actType.actUFSubNote:
        return {
          ...dt,
          file:action.payload.fileD
        }
      default:
        return dt;
    }
}

export default notedReducer;


function _newDtAwal(action = {}) {
  if(Object.keys(action).length==0){
    return {};
  }  
  let dkategori={}, doption=[];
  if(action.dkategori[0].data!=undefined){
    dkategori =  action.dkategori.map(v=>{ return {...v, data:(v.data.length>20?JSON.parse(atob(v.data)):[])}});
    doption = [
      {
          label:"Text Ringkasan",
          value:""
      }
      ,...dkategori.map(v=>{
          if(v.data.length>=2){
              return {
                  label:v.data[0].label,
                  value:v.data[1].label
              }
          }
          
      })
  ];  
  }else{
    doption =  action.dkategori;
  } 

  
  return {
      ...action,
      induk:action.induk.map(v=>{
          const indOps = doption.findIndex(v1=>v1.value!= "" && v.judul.search(v1.value)==1);  
          return {
              ...v,
              judul:(indOps<0?v.judul:v.judul.substring(doption[indOps].value.length)),
              indOps:(indOps<0?0:indOps)
          }
      }), 
      dkategori:doption
  }
}
