import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

class Alert extends Component {

  componentWillMount() {
    this.setState({ open: false });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alerts && Object.keys(nextProps.alerts).length > 0) {
      const nextMessage = nextProps.alerts[Object.keys(nextProps.alerts)[0]];
      this.displayNotification(nextMessage, Object.keys(nextProps.alerts)[0]);
    }
  }

  handleRequestClose() {
    clearTimeout(this.timer);
    this.setState({ open: false });
    this.props.clearAlert(this.state.id);
  }

  displayNotification(alert, id) {
    this.setState({ message: alert, id, open: true });
    this.timer = setTimeout(() => {
      // this.props.clearAlert(this.state.id);
    }, 3000);
  }

  render() {
    return (
      <Snackbar
        open={this.state.open}
        message={this.state.message}
        action='Cerrar'
        autoHideDuration={3000}
        onRequestClose={this.handleRequestClose.bind(this)}
      />
    );
  }
}


export default Alert;
