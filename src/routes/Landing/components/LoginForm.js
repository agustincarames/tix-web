import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Paper from 'material-ui/Paper';
import {
  TextField
} from 'redux-form-material-ui'

class LoginForm extends Component {

  render(){
    const { handleSubmit } = this.props;
    return(
      <Paper className="hgroup">
        <h3>{ `Iniciar sesión` }</h3>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="control-group">
              <div className="controls">
                <Field type="text" name="username" component={TextField} floatingLabelText="Email" />
              </div>
            </div>
            <div className="control-group">
              <div className="controls">
                <Field type="password" name="password" component={TextField} floatingLabelText={'Constraseña'} />
                <br />
                <a href="#">
                  { `Olvidó su contraseña?` }
                </a>
              </div>
            </div>
            <div className="control-group">
              <div className="controls">
                <button className="btn btn-primary btn-large" type="submit" >Enviar</button>
              </div>
            </div>
          </form>
        </div>
      </Paper>
    )
  }
}

LoginForm = reduxForm({
  form: 'login' // a unique name for this form
})(LoginForm);

export default LoginForm;
