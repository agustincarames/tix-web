import typeToReducer from 'type-to-reducer';
import R from 'ramda';
import { FETCH_USER_INSTALLATIONS, SET_ACTIVE_INSTALLATION, DELETE_INSTALLATION, EDIT_INSTALLATION } from '../actions';
import { LOGOUT_USER } from '../../account/actions';

export default typeToReducer({
  [FETCH_USER_INSTALLATIONS]: {
    FULFILLED: (state, action) => {
      return {
        ...state,
        list: R.indexBy(R.prop('id'), action.payload),
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
  },
  [DELETE_INSTALLATION]: {
    FULFILLED: (state, action) => {
      var list = delete list[action.installationId];
      console.log(list);
      return {
        ...state,
        list: list
      }
    }
  },
  [EDIT_INSTALLATION]: {
    FULFILLED: (state, action) => {
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.id]: {
            ...state.list[action.payload.id],
            name: action.payload.name
          }
        }

      }
    }
  }
}, {});
