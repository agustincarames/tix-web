import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import R from 'ramda';
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
          {displayLogout(props.user, props.logoutUser, props.stopImpersonationFunc)}
        </div>
      </div>
    </div>
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
