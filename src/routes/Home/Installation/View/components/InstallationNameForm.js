import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  TextField
} from 'redux-form-material-ui'
import Done from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import './InstallationView.scss';

class InstallationNameForm extends Component {

  render(){
    const { handleSubmit, toggleEditInstallation } = this.props;
    return(
        <form onSubmit={handleSubmit}>
          <div className="installation-form-direction">
            <Field type="string" name="installationName" component={TextField} hintText="Nombre Installación"  />
            <IconButton type="submit">
              <Done />
            </IconButton>
            <IconButton onTouchTap={toggleEditInstallation}>
              <Clear />
            </IconButton>
          </div>
        </form>
      )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      installationName: ownProps.installation.name
    }
  }
}

InstallationNameForm = reduxForm({
  form: 'InstallationNameForm',
})(InstallationNameForm);

export default connect(mapStateToProps)(InstallationNameForm);

