import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class InstallationsView extends Component {

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = store => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InstallationsView);
