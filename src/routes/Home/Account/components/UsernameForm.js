import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

class UsernameForm extends Component {

  render(){
    const { handleSubmit } = this.props;
    return(
      <div>
        <form className="form-alignment" onSubmit={handleSubmit}>
          <div className="row-fluid">
            <div className="span3">
              <strong>Nickname: </strong><br />
            </div>
            <div className="span4">
              <Field type="string" component="input" name="username" />
            </div>
          </div>

          <div className="row-fluid">
            <div className="span3">
              <strong>Contrase&ntilde;a: </strong><br />
            </div>
            <div className="span4">
              <Field type="password" component="input" name="oldPassword" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-mini">
            <i className="icon-ok icon-white"></i> Guardar cambios
          </button>
        </form>
      </div>)
  }
}

UsernameForm = reduxForm({
  form: 'usernameForm',
})(UsernameForm);

export default UsernameForm;
