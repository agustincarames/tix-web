import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../../../store/domain/account/actions';
import { fetchUserInstallation } from '../../../store/domain/installation/actions';
import { fetchReports } from '../../../store/domain/report/actions';
import SidebarView from '../../../components/Sidebar/SidebarView';
import DashboardView  from '../../../components/Dashboard';
class HomeView extends Component {

  componentDidMount(){
    this.props.loadUserData();
    this.props.loadInstallations(this.props.user.id).then((res) => {this.props.loadReports(this.props.user.id)});
  }

  render() {
    const {
      installations,
      loadReports
    } = this.props;

    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SidebarView installations={installations} loadReports={loadReports} />
          </div>

          <div className="col-md-9">
            <DashboardView />
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
    loadInstallations: (userId) => dispatch(fetchUserInstallation(userId)),
    loadReports: (userId) => dispatch(fetchReports(userId))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);
