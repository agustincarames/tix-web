import typeToReducer from 'type-to-reducer';
import R from 'ramda';
import { FETCH_REPORTS, FETCH_ALL_REPORTS } from '../actions';
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
  [FETCH_ALL_REPORTS]: {
    FULFILLED: (state, action) => {
      var report = [];
      var providerList = []
      action.payload.forEach((measure) => {
        if(!report[measure.provider_id]){
          report[measure.provider_id] = {};
          report[measure.provider_id].upUsage = [];
          report[measure.provider_id].downUsage = [];
          report[measure.provider_id].upQuality = [];
          report[measure.provider_id].downQuality = [];
          report[measure.provider_id].dates = [];
          providerList.push(measure.provider_id);
        }
        report[measure.provider_id].upUsage.push(measure.upUsage);
        report[measure.provider_id].downUsage.push(measure.downUsage);
        report[measure.provider_id].upQuality.push(measure.upQuality);
        report[measure.provider_id].downQuality.push(measure.downQuality);
        report[measure.provider_id].dates.push(measure.timestamp);
      });
      providerList.forEach((providerId) => {
        console.log('providerid');
        console.log(report[providerId].upUsage[Math.round(report[providerId].upUsage.length/2)]);
        report[providerId].upUsageMedian = report[providerId].upUsage[Math.round(report[providerId].upUsage.length/2)];
        report[providerId].downUsageMedian = report[providerId].downUsage[Math.round(report[providerId].downUsage.length/2)];
        report[providerId].upQualityMedian = report[providerId].upQuality[Math.round(report[providerId].upQuality.length/2)];
        report[providerId].downQualityMedian = report[providerId].downQuality[Math.round(report[providerId].downQuality.length/2)];
      })
      return {
        "providerList": providerList,
        "fullReport": report
      }
    }
  },
  [LOGOUT_USER]: (state, action) => {
    return {};
  }

}, []);
