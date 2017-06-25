import fetch from '../../../../utils/fetch';
import { push } from 'react-router-redux';
export const FETCH_ALL_PROVIDERS = 'FETCH_ALL_PROVIDERS';

export function fetchProviders(userId) {
  return dispatch => {
    return dispatch({
      type: FETCH_ALL_PROVIDERS,
      payload: fetch(`/user/${userId}/provider`),
    });
  };
}


