import fetch from '../../../../utils/fetch';
import { push } from 'react-router-redux';
export const LOGIN_USER = 'LOGIN_USER';
export const FETCH_USER = 'FETCH_USER';
export const UNAUTHORIZED = 'UNAUTHORIZED';
export const REGISTER_USER = 'REGISTER_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOCAL_STORAGE_LOAD = 'LOCAL_STORAGE_LOAD';

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
    }).then((response) => {
      localStorage.setItem("user", JSON.stringify(response));
      return dispatch(push('/home'));
    });
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

export function logoutUser() {
  return dispatch => {
    dispatch({
      type: LOGOUT_USER
    });
    return dispatch({type: UNAUTHORIZED})
  }
}

export function loadFromLocalStorage(user){
  return dispatch => {
    dispatch({
      type: LOCAL_STORAGE_LOAD,
      payload: user
    });
  }
}
