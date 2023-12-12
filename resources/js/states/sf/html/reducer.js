import { actType } from './action';
function htmlReducer(dt = [], action = {}) {
    switch (action.type) {
      case actType.html:
        return {
          ...dt,
          ...action.payload
        }
      default:
        return dt;
    }
}

export default htmlReducer;
