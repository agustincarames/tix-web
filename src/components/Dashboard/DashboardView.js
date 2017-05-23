var React = require('react'),
  Highcharts = require('highcharts');

var Chart = React.createClass({
    // When the DOM is ready, create the chart.
    componentDidMount: function() {
      // Extend Highcharts with modules
      if (this.props.modules) {
        this.props.modules.forEach(function(module) {
          module(Highcharts);
        });
      }
      // Set container which the chart should render to.
      this.chart = new Highcharts[this.props.type || "Chart"](
        this.props.container,
        this.props.options
      );
    },
    //Destroy chart before unmount.
    componentWillUnmount: function() {
      this.chart.destroy();
    },
    //Create the div which the chart will be rendered to.
    render: function() {
      return React.createElement('div', {
        id: this.props.container
      });
    }
  });


// Create and render element
export default React.createElement(Chart, {
  container: 'chart',
  options: {
    chart: {
      type: 'funnel',
      marginRight: 100
    },
    title: {
      text: 'React example',
      x: -50
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b> ({point.y:,.0f})',
          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
          softConnector: true
        },
        neckWidth: '30%',
        neckHeight: '25%'

        //-- Other available options
        // height: pixels or percent
        // width: pixels or percent
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'Unique users',
      data: [
        ['Website visits', 15654],
        ['Downloads', 4064],
        ['Requested price list', 1987],
        ['Invoice sent', 976],
        ['Finalized', 846]
      ]
    }]
  }
});
