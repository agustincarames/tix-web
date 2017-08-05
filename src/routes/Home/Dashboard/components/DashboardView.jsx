import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BottomArrow from 'material-ui/svg-icons/editor/vertical-align-bottom';
import TopArrow from 'material-ui/svg-icons/editor/vertical-align-top';
import BothArrow from 'material-ui/svg-icons/editor/vertical-align-center';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import DashboardChart from '../../../../components/Charts/DashboardChart';
import { fetchReports } from '../../../../store/domain/report/actions';
import { fetchProviders } from '../../../../store/domain/provider/actions';
import SelectDate from './TimeForm';


class DashboardView extends Component {

  componentWillMount() {
    const {
      user,
      routeParams,
    } = this.props;
    this.setState({
      startDate: moment().subtract(1, 'days'),
      endDate: moment(),
    });
    this.props.fetchReports(user.id, routeParams.installationId,
      routeParams.providerId, moment().subtract(1, 'days'), moment());
    this.props.fetchProviders(user.id);
    this.installationId = routeParams.installationId;
    this.providerId = routeParams.providerId;
    this.setState({ selectedIndex:0 });
    this.selectDownstream = this.selectDownstream.bind(this);
    this.selectUpstream = this.selectUpstream.bind(this);
    this.selectGeneral = this.selectGeneral.bind(this);
    this.selectDates = this.selectDates.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.installationId !== nextProps.routeParams.installationId
      || this.providerId !== nextProps.routeParams.providerId) {
      this.providerId = nextProps.routeParams.providerId;
      this.installationId = nextProps.routeParams.installationId;
      nextProps.fetchReports(nextProps.user.id, nextProps.routeParams.installationId,
        nextProps.routeParams.providerId, this.state.startDate, this.state.endDate);
      this.setState({ selectedIndex: 0 });
    }
    if (nextProps.reports) {
      this.setData(nextProps.reports);
    }
  }

  setData(reports) {
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
      },
    ];
  }

  setUpstreamData(reports) {
    this.data = [
      {
        data: reports.upUsage,
        name: 'Utilizacion Up',
      },
      {
        data: reports.upQuality,
        name: 'Calidad Up',
      },
    ];
  }

  setDownstreamData(reports) {
    this.data = [
      {
        data: reports.downUsage,
        name: 'Utilizacion Down',
      },
      {
        data: reports.downQuality,
        name: 'Calidad Down',
      },
    ];
  }

  selectGeneral() {
    this.setData(this.props.reports);
    this.setState({ selectedIndex:0 });
    this.forceUpdate();
  }

  selectUpstream() {
    this.setUpstreamData(this.props.reports);
    this.setState({ selectedIndex:1 });
    this.forceUpdate();
  }

  selectDownstream() {
    this.setDownstreamData(this.props.reports);
    this.setState({ selectedIndex:2 });
    this.forceUpdate();
  }

  selectDates(dates) {
    const {
      user,
      routeParams,
    } = this.props;
    this.setState({
      startDate: moment(dates.startDate).format('YYYY-MM-DD'),
      endDate: moment(dates.endDate).format('YYYY-MM-DD'),
    });
    this.props.fetchReports(user.id, routeParams.installationId, routeParams.providerId,
      moment(dates.startDate).format('YYYY-MM-DD'), moment(dates.endDate).format('YYYY-MM-DD'));
  }

  getProviderName(providerId) {
    if (providerId === '0') return 'General';
    const providerName = this.props.providers[providerId];
    if (providerName) return providerName.name;
    return '';
  }

  render() {
    return (
      <div>
        <SelectDate onSubmit={this.selectDates.bind(this)} />
        <DashboardChart
          isp={this.getProviderName(this.props.routeParams.providerId)}
          email={this.props.user.username}
          fechas={this.fechas}
          data={this.data}
        />
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label='General'
              icon={<BothArrow />}
              onTouchTap={this.selectGeneral}
            />
            <BottomNavigationItem
              label='Upstream'
              icon={<TopArrow />}
              onTouchTap={this.selectUpstream}
            />
            <BottomNavigationItem
              label='Downstream'
              icon={<BottomArrow />}
              onTouchTap={this.selectDownstream}
            />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

DashboardView.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
  }),
  routeParams: PropTypes.shape({
    installationId: PropTypes.string,
    providerId: PropTypes.string,
  }),
  fetchReports: PropTypes.func,
  fetchProviders: PropTypes.func,
  providers: PropTypes.arrayOf({
    name: PropTypes.string,
  }),
  reports: PropTypes.arrayOf({
    upUsage: PropTypes.number,
    downUsage: PropTypes.number,
    upQuality: PropTypes.number,
    downQuality: PropTypes.number,
  }),
};

const mapStateToProps = (store) => ({
  user: store.account.user,
  reports: store.reports,
  providers: store.providers,
});

const mapDispatchToProps = dispatch => ({
  fetchReports: (userId, installationId, providerId, startDate, endDate) =>
    dispatch(fetchReports(userId, installationId, providerId, startDate, endDate)),
  fetchProviders: userId => dispatch(fetchProviders(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardView);

