import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends Component {

  render(){
    const { handleSubmit } = this.props;
    return(
      <div>
        <h3>{ `Iniciar sesión` }</h3>
        <div className="form-horizontal well">
          <form onSubmit={handleSubmit}>
            <div className="control-group">
              <label className="control-label" htmlFor="nickname">Email</label>
              <div className="controls">
                <Field type="text" component="input" name="username" />
              </div>
            </div>
            <div className="control-group">
              <label className="control-label" htmlFor="password">{ `Contraseña` }</label>
              <div className="controls">
                <Field type="password" component="input" name="password" />
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
      </div>
    )
  }
}

LoginForm = reduxForm({
  form: 'login' // a unique name for this form
})(LoginForm);

export default LoginForm;
