import React, { Component } from 'react';
import Highcharts from 'highcharts';
import Highstock from 'highcharts/highstock';
import ReactHighcharts from 'react-highcharts';

const Charts = ReactHighcharts.withHighcharts(Highstock);
class BoxPlotChart extends Component {

  componentWillMount() {
    this.config = this.buildConfig(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.config = this.buildConfig(newProps);
  }

  buildConfig(props) {
    return {
      chart: {
        type: 'boxplot',
      },

      title: {
        text: 'Highcharts box plot styling',
      },

      legend: {
        enabled: false,
      },

      xAxis: {
        categories: ['1', '2', '3', '4', '5'],
        title: {
          text: 'Experiment No.',
        },
      },

      yAxis: {
        title: {
          text: 'Observations',
        },
      },

      plotOptions: {
        boxplot: {
          fillColor: '#F0F0E0',
          lineWidth: 2,
          medianColor: '#0C5DA5',
          medianWidth: 3,
          stemColor: '#A63400',
          stemDashStyle: 'dot',
          stemWidth: 1,
          whiskerColor: '#3D9200',
          whiskerLength: '20%',
          whiskerWidth: 3,
        },
      },

      series: [{
        name: 'Observations',
        data: [
          [760, 801, 848, 895, 965],
          [733, 853, 939, 980, 1080],
          [714, 762, 817, 870, 918],
          [724, 802, 806, 871, 950],
          [834, 836, 864, 882, 910],
        ],
      }],
    };
  }

  render() {
    return (
      <Charts config={this.config} />
    );
  }
}
export default BoxPlotChart;
