import React, {Component} from 'react';
const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.

class DashboardChart extends Component {

  componentWillMount() {
    this.config = this.buildConfig(this.props);
  }

  componentWillReceiveProps(newProps){
    this.config = this.buildConfig(newProps);
  }

  buildConfig(props){
    return {
      chart: {
        type: 'boxplot'
      },
      title: {
        text: props.isp
      },
      plotOptions: {
        series: {
          shadow:false,
          borderWidth:0,
          dataLabels:{
            enabled:true,
            formatter:function() {
              return this.y + '%';
            }
          }
        }
      },
      xAxis: {
        minTickInterval: 1,
        categories: ['Calidad Subida', 'Calidad Bajada', 'Utilizacion Subida', 'Utilizacion Bajada']
      },
      yAxis:{
        title:{ text:'Porcentaje' },
        max: 100,
        min:0,
        labels: {
          formatter:function() {
            return Highcharts.numberFormat(this.value ,0,',') + '%';
          }
        }
      },
      series: [{
        name: props.isp,
        data: [props.data]
      }]
    }
  }

  render() {
    return(
      <ReactHighcharts config = {this.config}></ReactHighcharts>
    )
  }
}
export default DashboardChart;
