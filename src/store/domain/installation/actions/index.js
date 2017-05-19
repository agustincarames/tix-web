import fetch from '../../../../utils/fetch';
import { push } from 'react-router-redux';
export const FETCH_USER_INSTALLATIONS = 'FETCH_USER_INSTALLATIONS';


export function fetchUserInstallation(userId) {
  return dispatch => {
    return dispatch({
      type: FETCH_USER_INSTALLATIONS,
      payload: fetch(`/user/${userId}/installation`),
    });
  };
}
