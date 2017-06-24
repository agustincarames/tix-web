import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Paper from 'material-ui/Paper';
import {
  TextField
} from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton';

class UsernameForm extends Component {

  render(){
    const { handleSubmit } = this.props;
    return(
      <Paper>
        <form className="form-alignment form-display" onSubmit={handleSubmit}>
          <h4>{`Editar información`}</h4>
          <Field type="string" name="username"  component={TextField} floatingLabelText="Email"  />
          <Field type="password"  component={TextField} floatingLabelText={'Contraseña Actual'}  name="oldPassword" />
          <RaisedButton className="settings-button-margin" label="Guardar Cambios" type="submit">
          </RaisedButton>
        </form>
      </Paper>)
  }
}

UsernameForm = reduxForm({
  form: 'usernameForm',
})(UsernameForm);

export default UsernameForm;
