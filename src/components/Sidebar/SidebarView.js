import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import LocationList from './LocationList';
import './Sidebar.scss';
import {List, ListItem} from 'material-ui/List';
import Pencil from 'material-ui/svg-icons/content/create';
import Wrench from 'material-ui/svg-icons/action/build';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

class SidebarView extends Component {

  renderInstallations (installations, setActiveInstallation) {
    if(!installations.list) return [];
    return Object.keys(installations.list).map((key) => {
      var installation = installations.list[key];
      return (
        <LocationList
          installation={installation}
          key={installation.id}
          active={installations.activeInstallation === installation.id}
          activeLocation={installations.activeLocation}
          setActiveInstallation={setActiveInstallation}
        />
      )
    })
  }

  renderAdminLink(user, downloadAdminReport){

    if(user.role === 'admin'){
      return <ListItem
        primaryText={'Panel de Administracion'}
        containerElement={<Link to="/home/admin/users" />}
        nestedItems={[
          <ListItem primaryText={'Graficos de Utilización'} containerElement={<Link to="/home/admin/ispchart" />} />,
          <ListItem primaryText={'Descarga de Datos'} containerElement={<a target="self" href="/api/admin/reports.csv" />}/>
        ]}
      />;
    }
  }

  render () {
    const {
      installations,
      user,
      setActiveInstallation,
      downloadAdminReport
    } = this.props;
    return (
      <div>
        <List>
          <Subheader>Instalaciones</Subheader>
          {this.renderInstallations(installations, setActiveInstallation)}
        </List>
        <Divider />
        <List>
          <Subheader>Configuracion</Subheader>
          <ListItem primaryText={'Ver Instalaciones'} leftIcon={<Pencil />} containerElement={<Link to="/home/installation/view" />} />
          <ListItem primaryText={'Mi cuenta'} leftIcon={<Wrench />} containerElement={<Link to="/home/account" />} />
          <ListItem primaryText={'Reporte de usuario'} leftIcon={<Pencil />} containerElement={<Link to="/home/userreport" />} />
          {this.renderAdminLink(user, downloadAdminReport)}
        </List>
      </div>
    )
  }
}


export default SidebarView;

