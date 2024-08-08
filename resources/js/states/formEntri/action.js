import api from "../../utils/api";
import { toast } from 'react-toastify';
import { dfEntri } from "../../utils/dataFormEntri"; 
import { md5 } from 'js-md5';

const baseUrl = api.BASE_URL;
const actType = {
    _form: "_form", //_ set __get
    form:"form",
    __form: "__form",
    updForm: "updForm",

    

    _newOption: "_newOption", 
    _typeForm:"_typeForm",
    
    // finisingSettingForm: "finisingSettingForm",
    // updSelectForm:"updSelectForm",

    __formWithKey:"__formWithKey",
    _valueForm:"_valueForm",
    updValueForm:"updValueForm",
    delValueForm:"delValueForm",
}; 
function __form(v){
  return async (dispatch) => {  
    try {
      const dt = await api.POST({url:"formEntri/getForm", body:v});   
      dispatch({
        type:actType.__form,
        payload: dt
      });
    } catch (error) { 
      
      toast(error.message);
    }
    
  }
} 
function _form(v) { 
  return async (dispatch) => { 
      try {
        const dt = await api.POST({url:"formEntri/setForm", body:v});  
        dispatch({
          type:actType._form,
          payload:dt
        });
      } catch (error) { 
        toast(error.message);
      }
      // dispatch(hideLoading());
  };
}
function updForm(v) { 
  return async (dispatch) => { 
      try {
        const dt = await api.POST({url:"formEntri/updForm", body:v});  
        dispatch({
          type:actType.updForm,
          payload: {
            tujuan:v.tujuan,
            indU:v.indU
          }
        });
      } catch (error) { 
        toast(error.message);
      }
      // dispatch(hideLoading());
  };
}
function _typeForm({data, indS, indF, indO , keydb}) {
  return async (dispatch) => { 
      try {
        const opsi =dfEntri[indF].ops[indO];
        data[data.length]={ 
          indF,
          indO,
          ...tambahanObject(opsi.attr.length, (opsi.option!=undefined?opsi.option.length:0) ), 
        };
        const dt = await api.POST({url:"formEntri/setTypeForm", body:{...keydb, data:btoa(JSON.stringify(data))}}); 
        dispatch({
          type:actType._typeForm,
          payload:{
            indS,data
          }
        });
      } catch (error) { 
        toast(error.message);
      }
      // dispatch(hideLoading());
  };
}
function tambahanObject(valLength, valLengthOption){ 
  return {
      pertanyaan:'',
      valueAttr :penyesuaianValuesAttrAwal({ valLength, returnSub:true }),
      valueOption:penyesuaianValuesAttrAwal({ valLength:valLengthOption })
  }
}
function penyesuaianValuesAttrAwal({ valLength=1, returnSub=false}){ 
  if (valLength==0) {
      return [];
  }
  let sub = [],group = [];
  for (let i = 0; i < valLength; i++) {
      sub.push("");    
  }
  if(returnSub){
      return sub;
  }
  group.push(sub);  
  return group;
}
function delTypeFormSelected(v){
  return async (dispatch) => { 
    try { 
      const dt = await api.POST({url:"formEntri/setTypeForm", body:{...v,data:btoa(JSON.stringify(v.data))}});  
      dispatch({
        type:actType._typeForm,
        payload:{
          indS:v.indS,
          data:v.data,
        }
      });
    } catch (error) { 
      toast(error.message);
    }
  }
}
function updSelectForm(v){ 
  return async (dispatch) => { 
    try {  
      const dt = await api.POST({url:"formEntri/setTypeForm", body:{...v,data:btoa(JSON.stringify(v.data))}});
      dispatch({
        type:actType._typeForm,
        payload:{
          indS:v.indS,data:v.data
        }
      });
    } catch (error) { 
      toast(error.message);
    }
  }
}
function finisingSettingForm(v){
  return async (dispatch) => { 
    try { 
      const dt = await api.POST({url:"formEntri/setTypeForm", body:{...v,data:btoa(JSON.stringify(v.data))}});
      dispatch({
        type:actType._typeForm,
        payload:{
          indS:v.indS,data:v.data
        }
      });
    } catch (error) { 
      toast(error.message);
    }
  }
} 
// function _newOption({ data, indS}){   
//   return async (dispatch) => { 
//     try { 
//       dispatch({
//         type:actType._newOption,
//         payload: {
//           data, indS
//         }
//       });
//     } catch (error) { 
//       toast(error.message);
//     }
//     // dispatch(hideLoading());
// };
// }

// batas value form
function __formWithKey(v){ //ada tambahan kd - Sub Form
  return async (dispatch) => {  
    try {
      const dt = await api.POST({url:"formEntri/getFormWithKey", body:v});   
      dispatch({
        type:actType.__formWithKey,
        payload: dt
      });
    } catch (error) {  
      toast(error.message); 
    }
    
  }
}  
function _valueForm(v) {
  return async (dispatch) => { 
    try { 
      const dt = await api.POST({url:"formEntri/setValueForm", body:{...v,data:btoa(JSON.stringify(v.data))}}); 
      dispatch({
        type:actType._valueForm,
        payload:{...v,...dt}
      });
    } catch (error) { 
      toast(error.message);
    }
  }
}
function updValueForm(v) {
  return async (dispatch) => { 
    try { 
      const dt = await api.POST({url:"formEntri/updValueForm", body:{...v,data:btoa(JSON.stringify(v.data))}}); 
      dispatch({
        type:actType.updValueForm,
        payload:{
          iv:v.iv,
          data:v.data
        }
      });
    } catch (error) {  
      toast(error.message);
    }
  }
}
function delValueForm(v) {
  return async (dispatch) => { 
    try { 
      const dt = await api.POST({url:"formEntri/delValueForm", body:{...v}});  
      dispatch({
        type:actType.delValueForm,
        payload:v.iv
      });
    } catch (error) {  
      toast(error.message);
    }
  }
}

function __KdDF(v){
  return md5(JSON.stringify(v));
}

export {
  actType,
  __form,
  _form, 
  updForm,

  // _newOption,
  _typeForm,

  delTypeFormSelected,
  finisingSettingForm, 

  updSelectForm,
  baseUrl,

  // batas value form
  __formWithKey,
  _valueForm,
  updValueForm,
  delValueForm,
  __KdDF,
}