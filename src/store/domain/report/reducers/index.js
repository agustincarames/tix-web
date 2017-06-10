import typeToReducer from 'type-to-reducer';

import { FETCH_REPORTS } from '../actions';
import { LOGOUT_USER } from '../../account/actions';

export default typeToReducer({
  [FETCH_REPORTS]: {
    FULFILLED: (state, action) => {
      return action.payload
    }
  },
  [LOGOUT_USER]: (state, action) => {
    return {};
  }

}, []);
