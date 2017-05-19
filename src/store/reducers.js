import { combineReducers } from 'redux';
import locationReducer from './location';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import accountReducer from './domain/account/reducers';
import installationReducer from './domain/installation/reducers';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    form: formReducer,
    routing: routerReducer,
    account: accountReducer,
    installations: installationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
