import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import R from 'ramda';
import { fetchAdminReports } from 'store/domain/report/actions';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import HistogramChart from 'components/Charts/HistogramChart';
import FiltersForm from './FiltersForm';
import { fetchProviders } from 'store/domain/provider/actions';
import moment from 'moment';

class AdminView extends Component {

  componentWillMount(){
    this.props.fetchProviders(this.props.user.id);
  }

  getQuartilRepresentation(index) {
    var answer = [];
    if(!index){
      return answer;
    }
    answer[0] = index[0];
    answer[1] = index[Math.floor(index.length*0.25)];
    answer[2] = index[Math.floor(index.length*0.5)];
    answer[3] = index[Math.floor(index.length*0.75)];
    answer[4] = index[index.length - 1];
    return answer;

  }

  filterReports(data) {
    console.log(data);
    this.props.fetchAdminReports(data.isp, moment(data.startDate).format('YYYY-MM-DD'), moment(data.endDate).format('YYYY-MM-DD'))
  }

  renderHistograms() {
    const {
      reports
    } = this.props;
    if(!reports.upUsage) {
      return <div></div>
    }
    return (
      <Card className="card-margins">
        <CardTitle
          title='Reporte para ISP: '
          subtitle="Histogramas para los rangos de fechas definidos en los filtros"
        />
        <CardText>
          <div className="row">
            <div className="col-md-6">
              <HistogramChart data={reports.upUsageQuartils} description="Utilization Subida" title='Histograma Utilization Subida'/>
            </div>
            <div className="col-md-6">
              <HistogramChart data={reports.downUsageQuartils} description="Utilization Bajada" red title='Histograma Utilization Bajada' />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <HistogramChart data={reports.upQualityQuartils} description="Calidad Subida" title='Histograma Calidad Subida' />
            </div>
            <div className="col-md-6">
              <HistogramChart data={reports.downQualityQuartils} description="Calidad Bajada" red title='Histograma Calidad Bajada'/>
            </div>
          </div>
        </CardText>
      </Card>
    )
  }

  render() {
    const {
      providers
    } = this.props;
    return(
      <div>
        <FiltersForm providers={providers} onSubmit={this.filterReports.bind(this)} />
        {this.renderHistograms()}
      </div>

    )
  }
}

const mapStateToProps = (store) => ({
  user: store.account.user,
  reports: R.pathOr({}, ['reports','adminReport'], store),
  provider: store.reports.provider,
  providers: store.providers
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAdminReports: (isp, startDate, endDate) => dispatch(fetchAdminReports(isp, startDate, endDate)),
    fetchProviders: (userId) => dispatch(fetchProviders(userId))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminView);
