import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Paper from 'material-ui/Paper';
import {
  TextField,
} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

class LoginForm extends Component {

  render() {
    const { handleSubmit } = this.props;
    return (
      <Paper>
        <h3 className='log-in-header'>{ 'Iniciar sesión' }</h3>
        <div>
          <form onSubmit={handleSubmit} className='hgroup'>
            <Field type='text' name='username' component={TextField} floatingLabelText='Email' />
            <Field type='password' name='password' component={TextField} floatingLabelText={'Constraseña'} />
            <RaisedButton className='button-size' primary label='Log in'type='submit' />
            <a className='password-forgot-text' >Olvido su contraseña? </a>
          </form>
        </div>
      </Paper>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.required,
};

const LoginFormView = reduxForm({
  form: 'login', // a unique name for this form
})(LoginForm);

export default LoginFormView;
