import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../../../store/domain/account/actions';
import { fetchUserInstallation } from '../../../store/domain/installation/actions';
import { fetchReports } from '../../../store/domain/report/actions';
import SidebarView from '../../../components/Sidebar/SidebarView';
import { push } from 'react-router-redux';
import R from 'ramda';

class HomeView extends Component {

  componentDidMount(){
    this.props.loadUserData();
    var id = R.path(['user', 'id'], this.props);
    this.setState({ id: id });
    id && this.props.loadInstallations(this.props.user.id);
  }

  componentWillReceiveProps(nextProps){
    console.log(this.state);
    console.log(nextProps.user.id);
    if(this.state.id != nextProps.user.id) {
      this.state.id = nextProps.user.id;
      nextProps.loadInstallations(nextProps.user.id);
    } else if(nextProps.location.pathname == '/home' && nextProps.installations != null) {
      nextProps.redirectToReport(1,0);
    }

  }

  render() {
    const {
      installations,
      loadReports,
      user,
      children
    } = this.props;

    return(
        <div className="row">
          <div className="col-md-3">
            <SidebarView installations={installations} loadReports={loadReports} user={user} />
          </div>
          <div className="col-md-9">
            {children}
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
    loadReports: (userId) => dispatch(fetchReports(userId)),
    redirectToReport: (installationId, providerId) => dispatch(push(`/home/report/${installationId}/${providerId}`))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);
