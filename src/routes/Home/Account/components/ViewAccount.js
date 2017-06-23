import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UsernameForm from './UsernameForm';
import PasswordForm from './PasswordForm';
import {updatePassword, updateUsername} from 'store/domain/account/actions';

class AdminView extends Component {

  onUserSubmit(values){
    this.props.updateUsername(this.props.user.id, values.username, values.oldPassword);
  }

  onPasswordSubmit(values) {
    this.props.updatePassword(this.props.user.id, values.newPassword, values.oldPassword);
  }

  render() {
    return(
      <div className="hero-unit">
        <div className="row-fluid">
					<span className="span12" >
						<h3>Usuario</h3>
					</span>
          <span className="span12 breadcrumb">
						<h4>{`Editar información`}</h4>
            <UsernameForm onSubmit={ this.onUserSubmit.bind(this) }/>
            <h4>{`Editar contraseña`}</h4>
            <PasswordForm onSubmit={ this.onPasswordSubmit.bind(this) }/>
          </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  user: store.account.user
});

const mapDispatchToProps = (dispatch) => ({
  updatePassword: (userId, newPassword, oldPassword) => dispatch(updatePassword(userId, newPassword, oldPassword)),
  updateUsername: (userId, username, oldPassword) => dispatch(updateUsername(userId, username, oldPassword))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminView);
