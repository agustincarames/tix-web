import React from 'react';
import { IndexLink, Link } from 'react-router';
import './Header.scss';
import { connect } from 'react-redux';
import { logoutUser, stopImpersonation } from '../../store/domain/account/actions';
import Alert from 'components/Alert';
import { removeAlert } from 'store/domain/alerts/actions';
import R from 'ramda';

const displayLogout = (user, logout, stopImpersonation) => {
  if (user) {
    const action = user.isImpersonating ? stopImpersonation : logout;
    const actionString = user.isImpersonating ? 'Terminar impersonalizacion' : 'Cerrar sesion';
    return (
      <ul className='nav navbar-right'>
        <li>
          <a href='#' onClick={() => action()} >{`${actionString} (${user.username})`}</a>
        </li>
      </ul>
    );
  }
};

export const Header = props => (
  <header>
    <div className='navbar navbar-default navbar-margin'>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand'>TiX</Link>
        <div className='collapse navbar-collapse'>
          <ul className='nav navbar-nav'>
            <li>
              <Link to='/about'>Sobre el proyecto</Link>
            </li>
          </ul>
          {displayLogout(props.user, props.logoutUser, props.stopImpersonation)}
        </div>
      </div>
    </div>
    <div className='beta-banner'>{ 'Versión Beta' }</div>
    <Alert alerts={props.alerts} clearAlert={props.clearAlert} />
  </header>
);

const mapStateToProps = store => ({
  user: store.account.user,
  alerts: R.pathOr({}, ['alerts'], store),
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  stopImpersonation: () => dispatch(stopImpersonation()),
  clearAlert: id => dispatch(removeAlert(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
