import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchAllReports } from 'store/domain/report/actions';
import DashboardChart from 'components/Charts/DashboardChart';
import moment from 'moment';
import MonthlyReportTable from './MonthlyReportTable'

class UserReportView extends Component {

  componentWillMount(){
    this.props.fetchAllReports(this.props.user.id);
  }

  renderGraph(provider, report){
    var data = this.setGraphData(report);
    const {
      user
    } = this.props
    return (
      <DashboardChart isp={provider} email={user.username} fechas={data.fechas} data={data.data} />
    )
  }

  setGraphData(report){
    var data = {};
    data.fechas = report.dates;
    data.data = [
      {
        data: report.upUsage,
        name: 'Utilizacion Up',
      },
      {
        data: report.downUsage,
        name: 'Utilizacion Down',
      },
      {
        data: report.upQuality,
        name: 'Calidad Up',
      },
      {
        data: report.downQuality,
        name: 'Calidad Down',
      }
    ]
    return data;
  }

  render() {
    const {
      reports,
      providers
    } = this.props;
    return(
      <div>
        <div>
          <MonthlyReportTable providers={ providers } reports={ reports }/>
        </div>
        {providers && providers.map((provider) => this.renderGraph(provider, reports[provider]))}
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  user: store.account.user,
  reports: store.reports.fullReport,
  providers: store.reports.providerList
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllReports: (userId) => dispatch(fetchAllReports(userId,  moment().subtract(30, 'days'), moment()))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReportView);
