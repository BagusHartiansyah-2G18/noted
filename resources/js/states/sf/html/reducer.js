import { actType } from './action';
function htmlReducer(dt = [], action = {}) {
    switch (action.type) {
      case actType.html:
        return {
          ...dt,
          ...action.payload
        }
        case actType.um:
            return {
                ...dt,
                userMenu: action.payload
            }
      default:
        return dt;
    }
}

export default htmlReducer;
