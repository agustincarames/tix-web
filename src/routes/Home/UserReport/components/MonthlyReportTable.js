import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchAllReports } from 'store/domain/report/actions';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class MonthlyReportTable extends Component {

  renderTableValues(providers, reports) {
    return reports.providerList.map((provider) =>
      <TableRow>
        <TableRowColumn>{providers[provider].name}</TableRowColumn>
        <TableRowColumn>{reports.fullReport[provider].upQualityMedian}</TableRowColumn>
        <TableRowColumn>{reports.fullReport[provider].downQualityMedian}</TableRowColumn>
        <TableRowColumn>{reports.fullReport[provider].upUsageMedian}</TableRowColumn>
        <TableRowColumn>{reports.fullReport[provider].downUsageMedian}</TableRowColumn>
      </TableRow>
    )
  }

  renderTable(){
    const {
      providers,
      reports
    } = this.props;
    if(!reports.providerList || reports.providerList.length == 0 || !providers ){
      return <span> No hay información para mostrar</span>
    }

    return (
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
          {this.renderTableValues(providers, reports)}
        </TableBody>
      </Table>
    )
  }

  render() {
    const {
      providers,
      reports
    } = this.props;
    return (
      <Card className="card-margins">
        <CardTitle
          title='Tabla de medianas mensuales'
          subtitle="Esta tabla muestra las medianas mensuales de cada uno de los parámetros estudiados para cada uno de los proveedores de internet que utilizó el usuario."
        />
        <CardText>
          {this.renderTable()}
        </CardText>
      </Card>
    )
  }

}

export default MonthlyReportTable;
