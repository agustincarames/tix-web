import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import { connect } from 'react-redux';


const displayLogout = (user) => {
  if(user) {
    return (
      <ul className="nav navbar-right">
        <li>
          <span>{`Cerrar sesion (${user.username})`}</span>
        </li>
      </ul>
    )
  }
}

export const Header = (props) => (
    <div className="navbar navbar-default navbar-margin">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">TiX</Link>

        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li>
              <Link to='/about'>Sobre el proyecto</Link>
            </li>
          </ul>
          {displayLogout(props.user)}
        </div>
      </div>
    </div>
);

const mapStateToProps = (store) => ({
  user: store.account.user,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
