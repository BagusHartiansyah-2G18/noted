import { actType } from './action';
function publikasiReducer(dt = [], action = {}) {
    switch (action.type) {
      case actType.note: 
        return action.payload 
      default:
        return dt;
    }
}

export default publikasiReducer;
