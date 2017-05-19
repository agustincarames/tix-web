import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import ReCAPTCHA from 'react-google-recaptcha';

const Captcha = (props) => (
  <div>
    <ReCAPTCHA
      sitekey='6LexqSAUAAAAAKD-PBs2MePg0TCpRuyFi4-HJ66R'
      onChange={props.input.onChange}
    />
  </div>
);

class RegisterForm extends Component {

  render(){
    const { handleSubmit } = this.props;
    return(
      <div>
        <form onSubmit={handleSubmit}>
          <div className="control-group">
            <label className="control-label" for="nickname">Email:</label>
            <div className="controls">
              <Field type="text" component="input" name="username" />
            </div>
          </div>
          <div className="control-group">
            <label className="control-label" for="nickname">{`Contrasena:`}</label>
            <div className="controls">
              <Field type="password" component="input" name="password1" />
            </div>
          </div>
          <div className="control-group">
            <label className="control-label" for="nickname">{`Repetir Contrasena:`}</label>
            <div className="controls">
              <Field type="password" component="input" name="password2" />
            </div>
          </div>
          <div className="control-group">
            <Field name='captcharesponse' component={Captcha}/>
          </div>
          <div className="control-group">
            <div className="controls">
              <button className="btn btn-warning btn-large" type="submit">Enviar</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

RegisterForm = reduxForm({
  form: 'register'
})(RegisterForm);

export default RegisterForm;
