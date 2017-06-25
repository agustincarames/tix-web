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

class AdminView extends Component {

  componentWillMount() {
    this.props.fetchAdminReports();
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

  renderHistograms() {
    const {
      reports
    } = this.props;
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

    if(!this.props.reports.upUsage) {
      return <span>Nothing to show</span>
    }
    return(
      <div>
        <FiltersForm onSubmit={(data) => console.log(data)} />
        {this.renderHistograms()}
      </div>

    )
  }
}

const mapStateToProps = (store) => ({
  users: R.pathOr([], ['account', 'users'], store),
  reports: R.pathOr({}, ['reports','adminReport'], store),
  provider: store.reports.provider,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAdminReports: () => dispatch(fetchAdminReports())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminView);
