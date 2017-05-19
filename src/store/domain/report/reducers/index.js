import typeToReducer from 'type-to-reducer';

import { FETCH_REPORTS } from '../actions';

export default typeToReducer({
  [FETCH_REPORTS]: {
    FULFILLED: (state, action) => {
      return action.payload
    }
  }

}, []);
