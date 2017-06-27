import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RecoverForm from './RecoverForm';


class HomeView extends Component {

  submitRecoveryForm(formData) {
    this.props.sendRecoveryEmail(formData.email);
  }

  render() {

    return(
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <RecoverForm onSubmit={this.submitRecoveryForm.bind(this)} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store, state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);
