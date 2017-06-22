import fetch from '../../../../utils/fetch';
import { push } from 'react-router-redux';
export const FETCH_REPORTS = 'FETCH_REPORTS';

export function fetchReports(userId, installationId, providerId, startDate, endDate) {
  console.log(startDate, endDate);
  return dispatch => {
    dispatch({
      type: FETCH_REPORTS,
      payload: fetch(`/user/${userId}/reports?installationId=${installationId}&providerId=${providerId}`)
    });
  };
}
