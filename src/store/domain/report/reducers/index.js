import typeToReducer from 'type-to-reducer';
import R from 'ramda';
import { FETCH_REPORTS } from '../actions';
import { LOGOUT_USER } from '../../account/actions';

export default typeToReducer({
  [FETCH_REPORTS]: {
    FULFILLED: (state, action) => {
      var upUsage = [];
      var downUsage = [];
      var upQuality = [];
      var downQuality = [];
      var dates = [];
      action.payload.forEach((measure) => {
        upUsage.push(measure.upUsage);
        downUsage.push(measure.downUsage);
        upQuality.push(measure.upQuality);
        downQuality.push(measure.downQuality);
        dates.push(measure.timestamp);
      })
      return {
        'dates': dates,
        'upUsage': upUsage,
        'downUsage': downUsage,
        'upQuality': upQuality,
        'downQuality': downQuality
      }
    }
  },
  [LOGOUT_USER]: (state, action) => {
    return {};
  }

}, []);
