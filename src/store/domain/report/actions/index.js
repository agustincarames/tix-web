import fetch from '../../../../utils/fetch';
import { push } from 'react-router-redux';
export const FETCH_REPORTS = 'FETCH_REPORTS';
export const FETCH_ALL_REPORTS = 'FETCH_ALL_REPORTS';


export function fetchReports(userId, installationId, providerId, startDate, endDate) {
  return dispatch => {
    dispatch({
      type: FETCH_REPORTS,
      payload: fetch(`/user/${userId}/reports?installationId=${installationId}&providerId=${providerId}&startDate=${startDate}&endDate=${endDate}`)
    });
  };
}

export function fetchAllReports(userId, startDate, endDate) {
  return dispatch => {
    dispatch({
      type: FETCH_ALL_REPORTS,
      payload: fetch(`/user/${userId}/reports?startDate=${startDate}&endDate=${endDate}`)
    });
  };
}
