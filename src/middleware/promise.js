import {
  UNAUTHORIZED,
} from 'store/domain/account/actions';
import R from 'ramda';

function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }

  return false;
}

function mapResponseToPayload(res) {
  return {
    ...res.data,
    status: parseInt(res.status, 10),
  };
}

export default function promiseMiddleware(store) {
  return next => action => {
    const { payload, type, ...rest } = action;
    const state = store.getState();

    // if payload doesn't exist, move along
    if (!payload) { return next(action); }

    console.log(state);
    const username = R.path(['account', 'user','nickname'], state);
    const password = R.path(['account', 'user','password'], state);

    // payload can be either a function or a promise.
    // if its a function, let's execute that, before checking
    // whether its a promise
    const payloadResult = (typeof payload === 'function') ? payload(username, password) : payload;
    // if the resulting payload is not a promise, move along.
    if (!isPromise(payloadResult)) { return next(action); }

    // it is a promise, so we handle it.
    const SUCCESS = `${type}_FULFILLED`;
    const PENDING = `${type}_PENDING`;
    const FAILURE = `${type}_REJECTED`;
    next({ ...rest, type: PENDING });

    function checkStatus(res) {
      console.log(res);
      return res
    }

    function handleFailure(res) {
      console.log(res);
      console.log(res.headers);
      next({
        ...rest,
        payload: res.data,
        status: res.status,
        type: FAILURE,
      });

      console.log(res);

      if (res.status === 401) {
        store.dispatch({ type: UNAUTHORIZED });
      }

      throw mapResponseToPayload(res);
    }

    function handleSuccess(res) {
      next({
        ...rest,
        payload: res.data,
        status: res.status,
        type: SUCCESS,
      });

      return mapResponseToPayload(res);
    }

    return payloadResult
      .then(handleSuccess, handleFailure);
  };
}
