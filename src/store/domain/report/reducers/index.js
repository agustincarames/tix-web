import typeToReducer from 'type-to-reducer';
import R from 'ramda';
import { FETCH_REPORTS, FETCH_ALL_REPORTS, FETCH_ADMIN_REPORTS } from '../actions';
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
  [FETCH_ADMIN_REPORTS]: {
    FULFILLED: (state, action) => {
      var report = {};
      report.upUsage = [];
      report.downUsage = [];
      report.upQuality = [];
      report.downQuality = [];
      report.upUsageQuartils = new Array(10).fill(0);
      report.downUsageQuartils = new Array(10).fill(0);
      report.upQualityQuartils = new Array(10).fill(0);
      report.downQualityQuartils = new Array(10).fill(0);
      action.payload.forEach((measure) => {
        report.upUsage.push(measure.upUsage);
        assignQuartils(report.upUsageQuartils, measure.upUsage)
        report.downUsage.push(measure.downUsage);
        assignQuartils(report.downUsageQuartils, measure.downUsage)
        report.upQuality.push(measure.upQuality);
        assignQuartils(report.upQualityQuartils, measure.upQuality)
        report.downQuality.push(measure.downQuality);
        assignQuartils(report.downQualityQuartils, measure.downQuality)
      })
      report.upUsage = report.upUsage.sort();
      report.downUsage = report.downUsage.sort();
      report.upQuality = report.upQuality.sort();
      report.downQuality = report.downQuality.sort();
      return {
        "provider": 1,
        "adminReport": report
      }
    }
  },
  [LOGOUT_USER]: (state, action) => {
    return {};
  }

}, []);

function assignQuartils(quartilsArray, value){
  var w = 0
  for(var i = 0.1; i<=1 ; i += 0.1){
    if(value <= i){
      quartilsArray[w] += 1;
      return;
    }
    w++;
  }
}
