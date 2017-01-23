import fetch from '../../../../utils/fetch';
import { push } from 'react-router-redux';
export const LOGIN_USER = 'LOGIN_USER';
export const FETCH_USER = 'FETCH_USER';
export const UNAUTHORIZED = 'UNAUTHORIZED';

export function fetchCurrentUser() {
  return dispatch => {
    return dispatch({
      type: FETCH_USER,
      payload: fetch('/user/current'),
    });
  };
}

export function loginUser(login) {
  return dispatch => {
    dispatch({
      type: LOGIN_USER,
      login
    });
    dispatch(push('/home'));
  };
}
