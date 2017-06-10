import typeToReducer from 'type-to-reducer';

import { FETCH_USER_INSTALLATIONS } from '../actions';
import { LOGOUT_USER } from '../../account/actions';

export default typeToReducer({
  [FETCH_USER_INSTALLATIONS]: {
    FULFILLED: (state, action) => {
      return {
        ...state,
        list: action.payload,
        active: action.payload[0].id
      }
    }
  },
  [LOGOUT_USER]: (state, action) => {
    return {};
  }

}, {});
