import typeToReducer from 'type-to-reducer';
import { FETCH_REPORTS, FETCH_ALL_REPORTS, FETCH_ADMIN_REPORTS } from '../actions';
import { LOGOUT_USER } from '../../account/actions';

let version = 0;

export default typeToReducer({
  [FETCH_REPORTS]: {
    FULFILLED: (state, action) => {
      const upUsage = [];
      const downUsage = [];
      const upQuality = [];
      const downQuality = [];
      const dates = [];
      action.payload.forEach((measure) => {
        upUsage.push(measure.upUsage);
        downUsage.push(measure.downUsage);
        upQuality.push(measure.upQuality);
        downQuality.push(measure.downQuality);
        dates.push(measure.timestamp);
      });
      return {
        dates,
        upUsage,
        downUsage,
        upQuality,
        downQuality,
      };
    },
  },
  [FETCH_ALL_REPORTS]: {
    FULFILLED: (state, action) => {
      const report = [];
      const providerList = [];
      action.payload.forEach((measure) => {
        if (!report[measure.provider_id]) {
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
        report[providerId].upUsageMedian =
          report[providerId].upUsage[Math.round(report[providerId].upUsage.length / 2)];
        report[providerId].downUsageMedian =
          report[providerId].downUsage[Math.round(report[providerId].downUsage.length / 2)];
        report[providerId].upQualityMedian =
          report[providerId].upQuality[Math.round(report[providerId].upQuality.length / 2)];
        report[providerId].downQualityMedian =
          report[providerId].downQuality[Math.round(report[providerId].downQuality.length / 2)];
      });
      return {
        providerList,
        fullReport: report,
      };
    },
  },
  [FETCH_ADMIN_REPORTS]: {
    FULFILLED: (state, action) => {
      version += 1;
      return {
        version,
        provider: 1,
        adminReport: action.payload,
      };
    },
  },
  [LOGOUT_USER]: () => ({}),
}, []);
