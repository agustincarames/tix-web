import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../../../store/domain/account/actions';

class HomeView extends Component {

  componentWillMount(){
    this.props.loadUserData();
  }

  render() {
    return(
      <div>
        home
      </div>
    )
  }
}

const mapStateToProps = () => ({ });

const mapDispatchToProps = dispatch => ({
  loadUserData: () => dispatch(fetchCurrentUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);
