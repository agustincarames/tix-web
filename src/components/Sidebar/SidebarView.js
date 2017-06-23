import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import LocationList from './LocationList';
import './Sidebar.scss';

class SidebarView extends Component {

  renderInstallations (list, activeInstallation, activeLocation, setActiveInstallation) {
    if(!list) return [];
    return list.map((installation) =>
      <LocationList
        installation={installation}
        key={installation.id}
        active={activeInstallation === installation.id}
        activeLocation={activeLocation}
        setActiveInstallation={setActiveInstallation}
      />
    )
  }

  renderAdminLink(user){
    if(user.role == 'admin'){
      return <li><Link to="/home/admin">Panel de Administracion</Link></li>
    }
  }

  render () {
    const {
      installations,
      user,
      setActiveInstallation
    } = this.props;
    return (
      <div>
        <div className="well sidebar-nav">
          <ul className="nav nav-list">
            <li className="nav-header">Instalaciones</li>
            {this.renderInstallations(installations.list, installations.activeInstallation, installations.activeLocation, setActiveInstallation)}
            <li className="divider"></li>
            <li ><a> Set as default installation <i className="glyphicon glyphicon-bookmark"></i> </a></li>
            <li className="divider"></li>
            <li><Link to="/home/installation/view"><i className="icon glyphicon glyphicon-pencil" />{'Ver Instalaciones'}</Link>
            </li>
            <li className="divider"></li>
            <li><Link to="/home/account"><i className="icon glyphicon glyphicon-cog"></i>Mi cuenta</Link></li>
            <li><Link to="/home/userreport">Reporte de usuario</Link></li>
            {this.renderAdminLink(user)}
          </ul>
        </div>
      </div>

    )
  }
}


export default SidebarView;

