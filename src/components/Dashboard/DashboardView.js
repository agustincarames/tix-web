import React, {Component} from 'react';
import SelectDate from './TimeForm'
import DashboardChart from '../Charts/DashboardChart';

class Chart extends Component {

  componentWillMount(){
    this.fechas = [new Date().setMinutes(0),new Date().setMinutes(1),new Date().setMinutes(2),new Date().setMinutes(3),new Date().setMinutes(4),new Date().setMinutes(5),
      new Date().setMinutes(6),new Date().setMinutes(7),new Date().setMinutes(8),new Date().setMinutes(9),new Date().setMinutes(10),new Date().setMinutes(11)];
    this.data = [
      {
        data: [0.9, 0.5, 0.4, 0.2, 0.0, 0.0, 0.6, 0.5, 0.4, 0.1, 0.6, 0.4],
        name: 'Utilizacion Up',
      },
      {
        data: [0.8, 0.4, 0.3, 0.2, 0.1, 0.1, 0.66, 0.6, 0.6, 0.6, 0.6, 0.6],
        name: 'Utilizacion Down',
      },
      {
        data: [0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.15, 0.5, 0.4],
        name: 'Calidad Up',
      },
      {
        data: [0.9, 0.5, 0.5, 0.2, 0.2, 0.2, 0.2, 0.52, 0.24, 0.2, 0.26, 0.24],
        name: 'Calidad Down',
      }
    ]
  }

  submitDate(dates) {
    this.data = [
      {
        data: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8]
      },
      {
        data: [0.8, 0.4, 0.3, 0.2, 0.1, 0.1, 0.66, 0.6, 0.6, 0.6, 0.6, 0.6]
      },
      {
        data: [0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.15, 0.5, 0.4]
      },
      {
        data: [0.9, 0.5, 0.5, 0.2, 0.2, 0.2, 0.2, 0.52, 0.24, 0.2, 0.26, 0.24]
      }
    ]
    this.forceUpdate();
  };

  render() {
    return(
      <div>
        <SelectDate onSubmit={this.submitDate.bind(this)} />
        <DashboardChart isp="General" email="matiasdomingues@gmail.com" fechas={this.fechas} data={this.data} />
        <div className="jumbotron jumbotron-display">
          <div className="row">
            <div className="text-center">
              <a className="btn btn-primary">General</a>
              <a className="btn btn-primary">Upstream</a>
              <a className="btn btn-primary">Downstream</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Chart;
