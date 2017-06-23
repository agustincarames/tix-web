import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

class PasswordForm extends Component {

  render(){
    const { handleSubmit } = this.props;
    return(
      <div>
        <form className="form-alignment" onSubmit={handleSubmit}>
          <div className="row-fluid">
            <div className="span3">
              <strong>Original: </strong><br />
            </div>
            <div className="span4">
              <Field type="password" component="input" name="oldPassword" />
            </div>
          </div>
          <div className="row-fluid">
            <div className="span3">
              <strong>Nueva: </strong><br />
            </div>
            <div className="span4">
              <Field type="password" component="input" name="newPassword" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-mini">
            <i className="icon-ok icon-white"></i> Guardar cambios
          </button>
        </form>
      </div>)
  }
}

PasswordForm = reduxForm({
  form: 'passwordForm',
})(PasswordForm);

export default PasswordForm;
