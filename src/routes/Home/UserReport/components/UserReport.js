import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchAllReports } from 'store/domain/report/actions';
import DashboardChart from 'components/Charts/DashboardChart';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class UserReportView extends Component {

  componentWillMount(){
    this.props.fetchAllReports(this.props.user.id);
  }

  renderTableValues(provider, report) {
    return(
      <TableRow>
        <TableRowColumn>{provider}</TableRowColumn>
        <TableRowColumn>{report.upQualityMedian}</TableRowColumn>
        <TableRowColumn>{report.downQualityMedian}</TableRowColumn>
        <TableRowColumn>{report.upUsageMedian}</TableRowColumn>
        <TableRowColumn>{report.downUsageMedian}</TableRowColumn>
      </TableRow>
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
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>ISP</TableHeaderColumn>
                  <TableHeaderColumn>Calidad Subida</TableHeaderColumn>
                  <TableHeaderColumn>Calidad Bajada</TableHeaderColumn>
                  <TableHeaderColumn>Utilizacion Subida</TableHeaderColumn>
                  <TableHeaderColumn>Utilizacion Bajada</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover={true}>
                {providers && providers.map((provider) => this.renderTableValues(provider, reports[provider]))}
              </TableBody>
            </Table>
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
