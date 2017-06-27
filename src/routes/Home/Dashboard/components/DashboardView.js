import React, {Component} from 'react';
import SelectDate from './TimeForm'
import DashboardChart from 'components/Charts/DashboardChart';
import { connect } from 'react-redux';
import { fetchReports } from 'store/domain/report/actions';
import moment from 'moment';
import BottomArrow from 'material-ui/svg-icons/editor/vertical-align-bottom';
import TopArrow from 'material-ui/svg-icons/editor/vertical-align-top';
import BothArrow from 'material-ui/svg-icons/editor/vertical-align-center';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

class DashboardView extends Component {

  componentWillMount(){
    const {
      user,
      routeParams
    } = this.props;
    this.props.fetchReports(user.id, routeParams.installationId, routeParams.providerId, moment().subtract(30, 'minutes'), moment());
    this.installationId = routeParams.installationId;
    this.providerId = routeParams.providerId;
    this.setState({selectedIndex:0})
  }

  componentWillReceiveProps(nextProps){
    if(this.installationId !== nextProps.routeParams.installationId || this.providerId !== nextProps.routeParams.providerId){
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
    this.setState({selectedIndex:0})
    this.forceUpdate();
  }

  selectUpstream(){
    this.setUpstreamData(this.props.reports);
    this.setState({selectedIndex:1})
    this.forceUpdate();

  }

  selectDownstream(){
    this.setDownstreamData(this.props.reports);
    this.setState({selectedIndex:2})
    this.forceUpdate();
  }

  selectDates(dates){
    const {
      user,
      routeParams
    } = this.props;
    this.props.fetchReports(user.id, routeParams.installationId, routeParams.providerId, moment(dates.startDate).format('YYYY-MM-DD'), moment(dates.endDate).format('YYYY-MM-DD'));
  }

  render() {
    return(
      <div>
        <SelectDate onSubmit={this.selectDates.bind(this)} />
        <DashboardChart isp="General" email="matiasdomingues@gmail.com" fechas={this.fechas} data={this.data} />
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="General"
              icon={<BothArrow />}
              onTouchTap={this.selectGeneral.bind(this)}
            />
            <BottomNavigationItem
              label="Upstream"
              icon={<TopArrow />}
              onTouchTap={this.selectUpstream.bind(this)}
            />
            <BottomNavigationItem
              label="Downstream"
              icon={<BottomArrow />}
              onTouchTap={this.selectDownstream.bind(this)}
            />
          </BottomNavigation>
        </Paper>
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

