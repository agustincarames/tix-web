import fetch from '../../../../utils/fetch';
import { push } from 'react-router-redux';
export const LOGIN_USER = 'LOGIN_USER';
export const FETCH_USER = 'FETCH_USER';
export const UNAUTHORIZED = 'UNAUTHORIZED';
export const REGISTER_USER = 'REGISTER_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOCAL_STORAGE_LOAD = 'LOCAL_STORAGE_LOAD';
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const IMPERSONATE_USER = "IMPERSONATE_USER";
export const STOP_IMPERSONATION = "STOP_IMPERSONATING";
export const UPDATE_USER = "UPDATE_USER";
export const SEND_RECOVERY_EMAIL = "SEND_RECOVERY_EMAIL";

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
    return dispatch({
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
    return dispatch({
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
    return dispatch({
      type: LOCAL_STORAGE_LOAD,
      payload: user
    });
  }
}

export function fetchAllUsers(){
  return dispatch => {
    return dispatch({
      type: FETCH_ALL_USERS,
      payload: fetch('/user/all')
    });
  }
}

export function impersonateUser(id){
  return dispatch => {
    return dispatch({
      type: IMPERSONATE_USER,
      payload: fetch(`/user/${id}`)
    }).then(() => {
      return dispatch(push('/home'));
    });
  }
}

export function stopImpersonation(){
  return dispatch => {
    dispatch({
      type: STOP_IMPERSONATION
    });
    return dispatch(fetchCurrentUser()).then(() => dispatch(push('/home')))
  }
}

export function updatePassword(userId, newPassword, oldPassword) {
  var body = {};
  body.newPassword = newPassword;
  body.oldPassword = oldPassword;
  return dispatch => {
    return dispatch({
      type: UPDATE_USER,
      payload: fetch(`/user/${userId}`, {method: 'put', body})
    })
  }
}

export function updateUsername(userId, username, oldPassword) {
  var body = {};
  body.username = username;
  body.oldPassword = oldPassword;
  return dispatch => {
    return dispatch({
      type: UPDATE_USER,
      payload: fetch(`/user/${userId}`, {method: 'put', body})
    })
  }
}

export function sendRecoveryEmail(email) {
  return dispatch => {
    return dispatch({
      type: SEND_RECOVERY_EMAIL,
      payload: fetch('/recover', {method: 'POST', body: {email}})
    })
  }
}

export function sendRecoveryPassword(email, code, password) {
  return dispatch => {
    return dispatch({
      type: SEND_RECOVERY_EMAIL,
      payload: fetch('/recover/code', {method: 'POST', body: {email, code, password}})
    })
  }
}

