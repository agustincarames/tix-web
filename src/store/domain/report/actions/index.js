import fetch from '../../../../utils/fetch';
import { push } from 'react-router-redux';
export const FETCH_REPORTS = 'FETCH_REPORTS';

export function fetchReports(userId, installationId) {
  return dispatch => {
    dispatch({
      type: FETCH_REPORTS,
      payload: fetch(`/user/${userId}/installation/${installationId}/reports`)
    });
  };
}
