import typeToReducer from 'type-to-reducer';

import { FETCH_USER_INSTALLATIONS, SET_ACTIVE_INSTALLATION } from '../actions';
import { LOGOUT_USER } from '../../account/actions';

export default typeToReducer({
  [FETCH_USER_INSTALLATIONS]: {
    FULFILLED: (state, action) => {
      return {
        ...state,
        list: action.payload,
        activeInstallation: action.payload.length > 0 ? action.payload[0].id : null,
        activeLocation: 0
      }
    }
  },
  [SET_ACTIVE_INSTALLATION]: (state, action) => {
    return {
      ...state,
      activeInstallation: action.installationId,
      activeLocation: action.locationId
    };
  },
  [LOGOUT_USER]: (state, action) => {
    return {};
  }

}, {});
