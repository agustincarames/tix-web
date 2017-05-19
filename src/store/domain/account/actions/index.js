import fetch from '../../../../utils/fetch';
import { push } from 'react-router-redux';
export const LOGIN_USER = 'LOGIN_USER';
export const FETCH_USER = 'FETCH_USER';
export const UNAUTHORIZED = 'UNAUTHORIZED';
export const REGISTER_USER = 'REGISTER_USER';

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
      payload: fetch('/login', {method: 'POST', body: login})
    }).then((response) => { console.log(response); return dispatch(push('/home'))});
  };
}

export function registerUser(register) {
  return dispatch => {
    dispatch({
      type: REGISTER_USER,
      payload: fetch('/register', { method: 'POST', body: register})
    });
  }
}
