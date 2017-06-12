import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import LocationList from './LocationList';
import './Sidebar.scss';

class SidebarView extends Component {

  renderInstallations (list, active) {
    if(!list) return [];
    return list.map((installation) => <LocationList installation={installation} key={installation.id} active={active === installation.id} />)
  }

  renderAdminLink(user){
    if(user.role == 'admin'){
      return <li><Link to="/home/admin">Panel de Administracion</Link></li>
    }
  }

  render () {
    const {
      installations,
      user
    } = this.props;
    return (
      <div>
        <div className="well sidebar-nav">
          <ul className="nav nav-list">
            <li className="nav-header">Instalaciones</li>
            {this.renderInstallations(installations.list, installations.active)}
            <li className="divider"></li>
            <li><a><i className="icon glyphicon glyphicon-plus-sign" />Nueva instalaci&oacute;n</a></li>
            <li><Link to="/home/installation/view"><i className="icon glyphicon glyphicon-pencil" />{'Ver Instalaciones'}</Link>
            </li>
            <li className="className"></li>
            <li><a><i className="icon glyphicon glyphicon-cog"></i>Mi cuenta</a></li>
            <li><a>Ayuda</a></li>
            <li><a>Reporte de usuario</a></li>
            {this.renderAdminLink(user)}
          </ul>
        </div>
      </div>

    )
  }
}


export default SidebarView;

