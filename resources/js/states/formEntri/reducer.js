import { actType } from './action';
function fentriReducer(dt = [], action = {}) {
    switch (action.type) {
      case actType.__form:  
         return action.payload.map(v=>{ return {...v, data:(v.data.length>20?JSON.parse(atob(v.data)):[])}});
        //  return action.payload.map(v=>{ return {...v, data:[{"indF":0,"indO":0,"pertanyaan":"Nama Pekerja ?","valueAttr":["nmP","nmP"],"valueOption":[],"nameJudul":"Input","name":"text","alt":"bidang input teks satu baris","attr":[0,1]},{"indF":0,"indO":0,"pertanyaan":"Surat Keputusan ( SK Bupati ) Pekerja","valueAttr":["sk","sk"],"valueOption":[],"nameJudul":"Input","name":"text","alt":"bidang input teks satu baris","attr":[0,1]},{"indF":0,"indO":0,"pertanyaan":"Nomor Rekening (Wajib Bank NTB)","valueAttr":["noreq","noreq"],"valueOption":[],"nameJudul":"Input","name":"text","alt":"bidang input teks satu baris","attr":[0,1]},{"indF":0,"indO":0,"pertanyaan":"Nama yang terdaftar di Bank","valueAttr":["anbank","anbank"],"valueOption":[],"nameJudul":"Input","name":"text","alt":"bidang input teks satu baris","attr":[0,1]},{"indF":0,"indO":0,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[]},{"indF":3,"indO":0,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[["12",null]]},{"indF":0,"indO":1,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[]},{"indF":0,"indO":1,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[]},{"indF":0,"indO":1,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[]},{"indF":0,"indO":1,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[]},{"indF":0,"indO":1,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[]},{"indF":0,"indO":1,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[]},{"indF":0,"indO":1,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[]},{"indF":1,"indO":0,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[]},{"indF":1,"indO":0,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[]},{"indF":1,"indO":0,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[]},{"indF":1,"indO":0,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[]},{"indF":1,"indO":0,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[]},{"indF":1,"indO":0,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[]},{"indF":1,"indO":0,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[]},{"indF":1,"indO":0,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[]},{"indF":3,"indO":0,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[[null,null]]},{"indF":3,"indO":0,"pertanyaan":null,"valueAttr":[null,null],"valueOption":[[null,null]]}]}});

      case actType._form: 
        return action.payload;
      
      case actType._typeForm:
        return dt.map((v,i)=>{
          if (i==action.payload.indS) { 
            return {...v, data:action.payload.data}; 
          }
          return v;
        });
      case actType.updForm: 
      // , data:[]
        return dt.map((v,i)=>{
          if (i==action.payload.indU) { 
            return {...v, tujuan:action.payload.tujuan}; 
          }
          return v;
        });

      //batas
      
      case actType.__formWithKey:  
        return {
          ...action.payload,
          form:{
            ...action.payload.form,
            data:(action.payload.form.data.length>20?JSON.parse(atob(action.payload.form.data)):[])
          },
          value:action.payload.value.map((v,i)=>{
            return {
              ...v,
              data:(v.data.length>20?JSON.parse(atob(v.data)):[])
            }
          })
        };
      case actType._valueForm:   
        // const fdt = ;
        // fdt[fdt.length]= {...action.payload};
        return {
          ...dt,
          value:[...dt.value,action.payload]
        };
      case actType.updValueForm:
        return {
          ...dt,
          value:dt.value.map((v,i)=>{
            if(i==action.payload.iv){
              return {
                ...v,
                data:action.payload.data
              }
            }
            return v;
          })
        };
      case actType.delValueForm:    
          return {
            ...dt,
            value:dt.value.filter((v,i)=>i!=action.payload)
          };
        
      // case actType.delTypeFormSelected:  
      //   return dt.map((v,i)=>{
      //     if (i==action.payload.indS) { 
      //       return {
      //         ...v, 
      //         data:v.data.filter((v,i)=>i!=action.payload.indTS)
      //       }; 
      //     }
      //     return v;
      //   });
      //   dt.filter((v1,i1)=> i1!=action.payload);



      //belum
      // case actType._newOption: 
      //   return dt.map((v,i)=>{
      //     if (i==action.payload.indS) { 
      //         return action.payload.data; 
      //     }
      //     return v;
      //   }); 
      
      // case actType.updSelectForm:  
      //   return dt.map((v,i)=>{
      //     if (i==action.payload.indS) { 
      //         return action.payload.data; 
      //     }
      //     return v;
      //   }); 
        
      default:
        return dt;
    }
}

export default fentriReducer;
