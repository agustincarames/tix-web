import {
  UNAUTHORIZED,
} from 'store/domain/account/actions';
import { push } from 'react-router-redux';

export default function authenticationMiddleware(store) {
  return next => action => {
    const {type} = action;

    if (type === UNAUTHORIZED) {
      store.dispatch(push('/'));
    }

    return next(action);
  }
}
