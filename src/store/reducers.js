import { combineReducers } from 'redux';
import locationReducer from './location';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import accountReducer from './domain/account/reducers';
import installationReducer from './domain/installation/reducers';
import alertReducer from './domain/alerts/reducers';
import reportReducer from './domain/report/reducers';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    form: formReducer,
    routing: routerReducer,
    account: accountReducer,
    installations: installationReducer,
    alerts: alertReducer,
    reports: reportReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
