import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <Link to="/" className="navbar-brand">TiX</Link>

      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li>
            <Link to='/about'>Sobre el proyecto</Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="beta-banner">{ `Versión Beta` }</div>
  </div>
);

export default Header
