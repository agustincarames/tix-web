import fetch from '../../../../utils/fetch';
import { push } from 'react-router-redux';

export const FETCH_USER_INSTALLATIONS = 'FETCH_USER_INSTALLATIONS';
export const SET_ACTIVE_INSTALLATION = 'SET_ACTIVE_INSTALLATION';
export const DELETE_INSTALLATION = 'DELETE_INSTALLATION';
export const EDIT_INSTALLATION = 'EDIT_INSTALLATION';

export function fetchUserInstallation(userId) {
  return dispatch => dispatch({
    type: FETCH_USER_INSTALLATIONS,
    payload: fetch(`/user/${userId}/installation`),
  });
}

export function setActiveInstallation(installationId, locationId) {
  locationId = locationId || 0;
  return (dispatch) => {
    dispatch({
      type: SET_ACTIVE_INSTALLATION,
      installationId,
      locationId,
    });
    return dispatch(push(`/home/report/${installationId}/${locationId}`));
  };
}

export function deleteInstallation(userId, installationId) {
  return dispatch => dispatch({
    type: DELETE_INSTALLATION,
    installationId,
    payload: fetch(`/user/${userId}/installation/${installationId}`, { method: 'delete' }),
  });
}

export function editInstallationName(userId, installationId, name) {
  const body = {};
  body.name = name;
  return dispatch => dispatch({
    type: EDIT_INSTALLATION,
    payload: fetch(`/user/${userId}/installation/${installationId}`, { method: 'put', body }),
  });
}

