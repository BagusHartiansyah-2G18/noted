import api from "../../../utils/api";

const actType = {
    html: "setHtml",
    um: "userMenu",
};
import { baseUrl } from "../../noted/action";
function htmlS(v) {
    return async (dispatch) => {
      dispatch({
          type : actType.html,
          payload : v,
      })
    }
}
function userMenuS(v) {
    return async (dispatch) => {
      dispatch({
          type : actType.um,
          payload : v,
      })
    }
}

function logout(){
    localStorage.removeItem('sess');
    window.location.replace('/logout');
}
function cko(url){ // cek open source / no keamanan
   
  // window.open.location=baseUrl+"cko/"+url;
  window.location.href=baseUrl+"cko/"+url;
}
async function saveJSON(data, saveAs){
  var stringified = JSON.stringify(data, null, 2); 
  var blob = new Blob([stringified], {type: "application/json"});
  var url = URL.createObjectURL(blob);
  await tombolDonwloadCreateClick(url,saveAs);
} 
function tombolDonwloadCreateClick(url,saveAs){
  var a = document.createElement('a');
  a.download = saveAs + '.json';
  a.href = url;
  a.id = saveAs;
  document.body.appendChild(a);
  a.click();
  try {
      document.querySelector('#' + a.id).remove();
  } catch (error) {
      
  }
}
function session(){
    return async (dispatch) => {
      let sess= null, menu=null ,data= null;
      try {
        sess = await localStorage.getItem('sess').then(resp=>{
          return resp;
        });
        // menu = listMenu({
        //   jenis : await localStorage.getItem('menu').then(resp=>{
        //     return resp;
        //   })
        // });
      } catch (error) {
          error;
      }

      if(sess === null){
        data = await api.GET({url:'dinas/sess'});
        await localStorage.setItem('sess',data.sess);
        await localStorage.setItem('menu',data.jenis);
        dispatch(setHtml({
          sess: data['user'],
          menu:listMenu({
              jenis : data['jenis'],
          })
        }))
      }else{
        dispatch(setHtml({
          sess,
          menu
        }))
      }

    }
}
function modalClose(){ 
  return async (dispatch) => {
    dispatch({
        type : actType.html,
        payload : {
          modal : false,
        },
    })
  }
}
function fileUrl(nmFile){
  return api.File_URL+nmFile;
}
async function uploadFile(body,callback){
  try {  
    const fileD = await api.POST({url:"sfmfc/uploadFile",body});
    callback({nama:fileD, url:fileUrl(fileD)});
  } catch (error) {
    callback("File gagal diupload.");
  } 
} 
const dtShare = [
  ["Private",1],
  ["Khusus",2],
  ["Public",3],
];

const checkForm=(dt)=>{
  // type, minLength, value
  try {
    dt.map((v,i)=>{
        switch (v.type) {
          case "text": 
            cfMinLength({...v,ind:i});
          break;
          case "email": 
            cfEmail({...v,ind:i});
          break;
        }
    })

    return {
      cf:1,
      msg:'',
      ind:-1
    }
  } catch (error) {
    return {
      cf:0,
      ...error
    }
  }
}
const cfMinLength=({value,minLength, ind})=>{
  if(String(value).length>=minLength){
    return true;
  }
  throw {msg: "value harus terisi minimal "+minLength, ind}
}
const cfEmail=({value,minLength, ind})=>{
  cfMinLength({value,minLength, ind});
  if(String(value).split("@").length>1){
    return true;
  }
  throw {msg: 'email harus menggunakan tandan @ ', ind}
}

const _statusAnggota=(status)=>{
  if(status){
    return "Terhubung";
  }
  return "Progress";
}
export {
    actType,
    htmlS,
    userMenuS,
    logout,
    modalClose,
    cko,
    saveJSON,
    uploadFile,
    fileUrl, 
    dtShare,
    checkForm,
    _statusAnggota,
}
