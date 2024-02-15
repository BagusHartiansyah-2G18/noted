
const actType = {
    html: "setHtml",
    um: "userMenu",
};

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

export {
    actType,
    htmlS,
    userMenuS
}
