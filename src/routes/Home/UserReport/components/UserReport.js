import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchAllReports } from 'store/domain/report/actions';
import DashboardChart from 'components/Charts/DashboardChart';
import moment from 'moment';

class UserReportView extends Component {

  componentWillMount(){
    this.props.fetchAllReports(this.props.user.id);
  }

  renderTableValues(provider, report) {
    return(
      <tr>
        <td>{provider}</td>
        <td>{report.upQualityMedian}</td>
        <td>{report.downQualityMedian}</td>
        <td>{report.upUsageMedian}</td>
        <td>{report.downUsageMedian}</td>
      </tr>
    )
  }

  renderGraph(report){
    var data = this.setGraphData(report);
    return (
      <DashboardChart isp="General" email="matiasdomingues@gmail.com" fechas={data.fechas} data={data.data} />
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
          <h2>
            Tabla de medianas mensuales
          </h2>
          <div id="meantable">
            <table class="table table-striped" width="647">
              <thead>
              <tr>
                <th>ISP</th>
                <th>Calidad Subida</th>
                <th>Calidad Bajada</th>
                <th>Utilizacion Subida</th>
                <th>Utilizacion Bajada</th>
              </tr>
              </thead>
              <tbody>
                {providers && providers.map((provider) => this.renderTableValues(provider, reports[provider]))}
              </tbody>
            </table>
          </div>
          <div id="meantabledescription">
            Esta tabla muestra las medianas mensuales de cada uno de los parámetros estudiados para cada uno de los proveedores de internet que utilizó el usuario.
          </div>
        </div>
        {providers && providers.map((provider) => this.renderGraph(reports[provider]))}
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
