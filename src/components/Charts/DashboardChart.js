import React, {Component} from 'react';
const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.
import moment from 'moment';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class DashboardChart extends Component {

  buildConfig(props){
    var fechasLength = props && props.fechas? props.fechas.length : 0;
    return {
      chart: {
        marginRight: 130,
        marginBottom: 40
      },
      title: {
        text: '',
        x: -20 //center
      },
      xAxis: {
        type: 'datetime',
        categories: props ? props.fechas : this.props.fechas,
        tickInterval: 6,
        labels: {
          enabled: true,
          formatter: function () {
            if(this.value <= 0){
              return "";
            }
            const date = moment(this.value);
            return `${date.date()}/${date.month()+1} <br> ${date.hour()}:${date.minute()}`;
          },
        },
        min: fechasLength < 50 ? 0 : fechasLength - 50,
        max: fechasLength,
      },
      yAxis: {
        title: {
          text: '% de utilizacion'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }],
        min: 0, max: 1
      },
      tooltip: {
        shared: true,
        crosshairs: true
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -10,
        y: 100,
        borderWidth: 0
      },
      scrollbar: {
        enabled: true
      },
      series: props ? props.data : this.props.data,
      plotOptions: {
        series: {
          cursor: 'pointer',
          turboThreshold: 0,
          marker: {
            lineWidth: 1
          }
        }
      },
    };
  }

  componentWillMount() {
    this.config = this.buildConfig();
  }

  componentWillReceiveProps(newProps){
    this.config = this.buildConfig(newProps);
  }

  renderGraph() {
    if(!this.props.data || this.props.fechas.length == 0){
      return <span>No hay reportes para mostrar</span>
    }
    return <ReactHighcharts config = {this.config}></ReactHighcharts>
  }


  render() {
    const {
      isp,
      email
    } = this.props;
    return(
      <Card className="card-margins">
        <CardTitle
          title={`Porcentaje de utilizacion de ancho de banda en ${isp}`}
          subtitle={ `Grafico general para ${email}`}
        />
        <CardText>
          {this.renderGraph()}
        </CardText>
      </Card>
    )
  }
}
export default DashboardChart;
