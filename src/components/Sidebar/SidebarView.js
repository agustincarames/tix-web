import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import LocationList from './LocationList';
import './Sidebar.scss';

class SidebarView extends Component {

  renderInstallations (list, active) {
    if(!list) return [];
    return list.map((installation) => <LocationList installation={installation} key={installation.id} active={active === installation.id} />)
  }

  render () {
    const {
      installations
    } = this.props;
    return (
      <div>
        <div className="well sidebar-nav">
          <ul className="nav nav-list">
            <li className="nav-header">Instalaciones</li>
            {this.renderInstallations(installations.list, installations.active)}
            <li className="divider"></li>
            <li><a><i className="icon glyphicon glyphicon-plus-sign" />Nueva instalaci&oacute;n</a></li>
            <li><a><i className="icon glyphicon glyphicon-pencil" />Editar instalaci&oacute;nes</a>
            </li>
            <li className="className"></li>
            <li><a><i className="icon glyphicon glyphicon-cog"></i>Mi cuenta</a></li>
            <li><a>Ayuda</a></li>
            <li><a>Reporte de usuario</a></li>
          </ul>
        </div>
      </div>

    )
  }
}


export default SidebarView;

