import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import R from 'ramda';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import './Header.scss';
import { logoutUser, stopImpersonation } from '../../store/domain/account/actions';
import Alert from '../../components/Alert';
import { removeAlert } from '../../store/domain/alerts/actions';

const displayLogout = (user, logout, stopImpersonationFunc) => {
  if (user) {
    const action = user.isImpersonating ? stopImpersonationFunc : logout;
    const actionString = user.isImpersonating ? 'Terminar impersonalizacion' : 'Cerrar sesion';
    return (
      <ul className='nav navbar-right'>
        <li>
          <a href='#' onClick={() => action()} >{`${actionString} (${user.username})`}</a>
        </li>
      </ul>
    );
  }
  return <div />;
};

const renderLeftIcon = (user, logout, stopImpersonalization) => {
  if (!user) {
    return <FlatButton label='Sobre el proyecto' />;
  }
  const menuItems = [<MenuItem onTouchTap={logout} primaryText="Cerrar sesion" />];
  if (user.isImpersonating) {
    menuItems.push(
      <MenuItem onTouchTap={stopImpersonalization} primaryText="Terminar Impersonalización"/>
    );
  }
  return (
    <IconMenu
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      {menuItems}
    </IconMenu>
  );
};


export const Header = props => (
  <header>
    <AppBar
      title='TiX'
      showMenuIconButton={false}
      iconElementRight={renderLeftIcon(props.user, props.logoutUser, props.stopImpersonationFunc)}
      style={{backgroundColor: '#0d47a1'}}
    />
    <div className='beta-banner'>{ 'Versión Beta' }</div>
    <Alert alerts={props.alerts} clearAlert={props.clearAlert} />
  </header>
);

Header.propTypes = {
  alerts: PropTypes.shape({
    message: PropTypes.string,
    id: PropTypes.string,
  }),
  user: PropTypes.shape({
    isImpersonating: PropTypes.boolean,
    username: PropTypes.string,
  }),
  clearAlert: PropTypes.func,
  stopImpersonationFunc: PropTypes.func,
  logoutUser: PropTypes.func,
};

const mapStateToProps = store => ({
  user: store.account.user,
  alerts: R.pathOr({}, ['alerts'], store),
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  stopImpersonationFunc: () => dispatch(stopImpersonation()),
  clearAlert: id => dispatch(removeAlert(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
