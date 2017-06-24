import React, {Component} from 'react';
import Snackbar from 'material-ui/Snackbar';

class LoginView extends Component {

  componentWillMount(){
    this.setState({open: false})
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.alert) {
      var nextMessage = nextProps.alert[0];
      this.setState({message: nextMessage.text});
    }

  }

  render () {
    return (
      <Snackbar
        open={this.state.open}
        message={this.state.message}
        action="undo"
        autoHideDuration={3000}
        onRequestClose={this.handleRequestClose}
      />
    )
  }
}


export default LoginView
