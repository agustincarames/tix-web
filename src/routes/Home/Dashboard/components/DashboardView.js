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
  }

  componentWillReceiveProps(nextProps){
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

  render() {
    return(
      <div>
        <SelectDate onSubmit={() => {console.log('click')}} />
        <DashboardChart isp="General" email="matiasdomingues@gmail.com" fechas={this.fechas} data={this.data} />
        <div className="jumbotron jumbotron-display">
          <div className="row">
            <div className="text-center">
              <a className="btn btn-primary">General</a>
              <a className="btn btn-primary">Upstream</a>
              <a className="btn btn-primary">Downstream</a>
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

