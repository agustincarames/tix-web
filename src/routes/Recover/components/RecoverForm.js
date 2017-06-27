import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import ReCAPTCHA from 'react-google-recaptcha';
import Paper from 'material-ui/Paper';
import {
  TextField
} from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton';

class RegisterForm extends Component {

  render(){
    const { handleSubmit } = this.props;
    return(
      <div style={{margin: '20px 0px'}}>
        <form onSubmit={handleSubmit}>
          <Paper>
            <h3 className="log-in-header">{ `Recuperar Contraseña` }</h3>
            <div>
              <form onSubmit={handleSubmit} className="hgroup">
                <Field type="text" name="email" component={TextField} floatingLabelText="Email" />
                <RaisedButton style={{marginBottom: '15px'}}  primary={true} label="Recuperar Contraseña"type="submit" />
              </form>
            </div>
          </Paper>
        </form>
      </div>
    )
  }
}

RegisterForm = reduxForm({
  form: 'register'
})(RegisterForm);

export default RegisterForm;
