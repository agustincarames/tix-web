import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import ReCAPTCHA from 'react-google-recaptcha';
import Paper from 'material-ui/Paper';
import {
  TextField
} from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton';

const Captcha = (props) => (
    <ReCAPTCHA
      sitekey='6LexqSAUAAAAAKD-PBs2MePg0TCpRuyFi4-HJ66R'
      onChange={props.input.onChange}
    />
);

class RegisterForm extends Component {

  render(){
    const { handleSubmit } = this.props;
    return(
      <div style={{margin: '20px 0px'}}>
        <form onSubmit={handleSubmit}>
          <Paper>
            <h3 className="log-in-header">{ `Registrarse` }</h3>
            <div>
              <form onSubmit={handleSubmit} className="hgroup">
                <Field type="text" name="username" component={TextField} floatingLabelText="Email" />
                <Field type="password" name="password1" component={TextField} floatingLabelText={'Contraseña'} />
                <Field type="password" name="password2" component={TextField} floatingLabelText={'Contraseña'} />
                <Field name='captcharesponse' component={Captcha}/>
                <RaisedButton style={{marginBottom: '15px'}} className="button-size" primary={true} label="Registrarse"type="submit" />
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
