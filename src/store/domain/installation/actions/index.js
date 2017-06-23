import fetch from '../../../../utils/fetch';
import { push } from 'react-router-redux';
export const FETCH_USER_INSTALLATIONS = 'FETCH_USER_INSTALLATIONS';
export const SET_ACTIVE_INSTALLATION = 'SET_ACTIVE_INSTALLATION';

export function fetchUserInstallation(userId) {
  return dispatch => {
    return dispatch({
      type: FETCH_USER_INSTALLATIONS,
      payload: fetch(`/user/${userId}/installation`),
    });
  };
}

export function setActiveInstallation(installationId, locationId) {
  locationId = locationId ? locationId : 0;
  return dispatch => {
    dispatch({
      type: SET_ACTIVE_INSTALLATION,
      installationId: installationId,
      locationId: locationId
    });
    dispatch(push(`/home/report/${installationId}/${locationId}`))
  };
}

