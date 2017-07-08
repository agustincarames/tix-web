import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Paper from 'material-ui/Paper';
import {
  TextField,
} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';


class PasswordForm extends Component {

  render() {
    const { handleSubmit } = this.props;
    return (
      <Paper>
        <form className='form-alignment form-display' onSubmit={handleSubmit}>
          <h4>{'Editar contraseña'}</h4>
          <Field type='password' component={TextField} floatingLabelText='Nueva Contraseña' name='newPassword' />
          <Field type='password' component={TextField} floatingLabelText='Contraseña Actual' name='oldPassword' />
          <RaisedButton className='settings-button-margin' label='Guardar Cambios' type='submit' />
        </form>
      </Paper>);
  }
}

PasswordForm = reduxForm({
  form: 'passwordForm',
})(PasswordForm);

export default PasswordForm;
