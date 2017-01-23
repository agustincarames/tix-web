import typeToReducer from 'type-to-reducer';

import { LOGIN_USER , FETCH_USER } from '../actions';

export default typeToReducer({
  [LOGIN_USER]: (state, action) => {
    return {
      ...state,
      user: action.login,
    }
  },
  [FETCH_USER]: {
    FULFILLED: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      }
    }
  }

}, {});
