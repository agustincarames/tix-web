import {
  UNAUTHORIZED,
  loadFromLocalStorage
} from 'store/domain/account/actions';
import { push } from 'react-router-redux';

var firstRun = true;

export default function authenticationMiddleware(store) {
  return next => action => {
    console.log(action);
    const {type} = action;

    if(firstRun) {
      firstRun = false;
      var user = localStorage.getItem("user");
      if(user){
        store.dispatch(loadFromLocalStorage(JSON.parse(user)));
      }
    }

    if (type === UNAUTHORIZED) {
      store.dispatch(push('/'));
    }

    return next(action);
  }
}
