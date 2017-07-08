import typeToReducer from 'type-to-reducer';

import { LOGIN_USER, FETCH_USER, LOGOUT_USER, LOCAL_STORAGE_LOAD, FETCH_ALL_USERS, IMPERSONATE_USER, STOP_IMPERSONATION } from '../actions';

export default typeToReducer({
  [LOGIN_USER]: {
    FULFILLED: (state, action) => ({
      ...state,
      user: action.payload,
    }),
  },
  [FETCH_USER]: {
    FULFILLED: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        ...action.payload,
      },
    }),
  },
  [LOCAL_STORAGE_LOAD]: (state, action) => ({
    ...state,
    user: {
      ...state.user,
      ...action.payload,
    },
  }),
  [LOGOUT_USER]: (state, action) => ({}),
  [FETCH_ALL_USERS]: {
    FULFILLED: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
  [IMPERSONATE_USER]: {
    FULFILLED: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        ...action.payload,
        isImpersonating: true,
      },
    }),
  },
  [STOP_IMPERSONATION]: (state, action) => ({
    ...state,
    user: {
      ...state.user,
      isImpersonating: false,
    },
  }),
}, {});
