import React, {Component} from 'react';
import SelectDate from './TimeForm'
import DashboardChart from 'components/Charts/DashboardChart';
import { connect } from 'react-redux';
import { fetchReports } from 'store/domain/report/actions';
import moment from 'moment';

class DashboardView extends Component {

  componentWillMount(){
    const {
      user,
      routeParams
    } = this.props;
    this.props.fetchReports(user.id, routeParams.installationId, routeParams.providerId, moment().subtract(30, 'minutes'), moment());
    this.installationId = routeParams.installationId;
    this.providerId = routeParams.providerId;
  }

  componentWillReceiveProps(nextProps){
    console.log(this.installationId);
    console.log(this.providerId);
    if(this.installationId != nextProps.routeParams.installationId || this.providerId != nextProps.routeParams.providerId){
      this.providerId = nextProps.routeParams.providerId;
      this.installationId = nextProps.routeParams.installationId;
      nextProps.fetchReports(nextProps.user.id, nextProps.routeParams.installationId, nextProps.routeParams.providerId, moment().subtract(30, 'minutes'), moment());
    }
    if(nextProps.reports){
      this.setData(nextProps.reports);
    }
  }

  setData(reports){
    this.fechas = reports.dates;
    this.data = [
      {
        data: reports.upUsage,
        name: 'Utilizacion Up',
      },
      {
        data: reports.downUsage,
        name: 'Utilizacion Down',
      },
      {
        data: reports.upQuality,
        name: 'Calidad Up',
      },
      {
        data: reports.downQuality,
        name: 'Calidad Down',
      }
    ]
  }

  setUpstreamData(reports){
    this.data = [
      {
        data: reports.upUsage,
        name: 'Utilizacion Up',
      },
      {
        data: reports.upQuality,
        name: 'Calidad Up',
      }
    ]
  }

  setDownstreamData(reports){
    this.data = [
      {
        data: reports.downUsage,
        name: 'Utilizacion Down',
      },
      {
        data: reports.downQuality,
        name: 'Calidad Down',
      }
    ]
  }

  selectGeneral(){
    this.setData(this.props.reports);
    this.forceUpdate();
  }

  selectUpstream(){
    this.setUpstreamData(this.props.reports);
    this.forceUpdate();
  }

  selectDownstream(){
    this.setDownstreamData(this.props.reports);
    this.forceUpdate();
  }

  selectDates(dates){
    const {
      user,
      routeParams
    } = this.props;
    this.props.fetchReports(user.id, routeParams.installationId, routeParams.providerId, dates.startDate, dates.endDate);
  }

  render() {
    return(
      <div>
        <SelectDate onSubmit={this.selectDates.bind(this)} />
        <DashboardChart isp="General" email="matiasdomingues@gmail.com" fechas={this.fechas} data={this.data} />
        <div className="jumbotron jumbotron-display">
          <div className="row">
            <div className="text-center">
              <a className="btn btn-primary" onClick={this.selectGeneral.bind(this)}>General</a>
              <a className="btn btn-primary" onClick={this.selectUpstream.bind(this)}>Upstream</a>
              <a className="btn btn-primary" onClick={this.selectDownstream.bind(this)}>Downstream</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store, state) => {
  return {
    user: store.account.user,
    reports: store.reports
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchReports: (userId, installationId, providerId, startDate, endDate, ) => dispatch(fetchReports(userId, installationId, providerId, startDate, endDate))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardView);

