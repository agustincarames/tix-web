import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../../../store/domain/account/actions';
import { fetchUserInstallation } from '../../../store/domain/installation/actions'
import SidebarView from '../../../components/Sidebar/SidebarView';

class HomeView extends Component {

  componentDidMount(){
    this.props.loadUserData();
    this.props.loadInstallations(this.props.user.id);
  }

  render() {
    const {
      installations
    } = this.props;
    return(
      <div className="container-fluid">
        <div className="row-fluid">
          <div className="span3">
            <SidebarView installations={installations} />
          </div>

          <div className="span9">


          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  user: store.account.user,
  installations: store.installations
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserData: () => dispatch(fetchCurrentUser()),
    loadInstallations: (userId) => dispatch(fetchUserInstallation(userId))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);
