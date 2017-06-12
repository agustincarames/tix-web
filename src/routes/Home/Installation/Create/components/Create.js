import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class InstallationsView extends Component {

  render() {

    return(
      <div className="container-fluid">
        <div className="row">
          Create
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
});

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstallationsView);
