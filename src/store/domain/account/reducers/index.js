import typeToReducer from 'type-to-reducer';

import { LOGIN_USER , FETCH_USER, REGISTER_USER, LOCAL_STORAGE_LOAD } from '../actions';

export default typeToReducer({
  [LOGIN_USER]: {
    FULFILLED: (state, action) => {
      return {
        ...state,
        user: action.payload,
      }
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
  },
  [LOCAL_STORAGE_LOAD]: (state, action) => {
    return {
      ...state,
      user: {
        ...state.user,
        ...action.payload
      }
    }
  }


}, {});
