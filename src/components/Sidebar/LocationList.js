import React from 'react'
import { IndexLink, Link } from 'react-router';
import './Sidebar.scss';
import FolderOpen from 'material-ui/svg-icons/file/folder-open';
import FolderClose from 'material-ui/svg-icons/file/folder';
import {ListItem} from 'material-ui/List';

const renderFolders = (providers, id, setActiveInstallation) => {
  var providerItems = [];
  providerItems.push(<ListItem primaryText={'General'} onTouchTap={() => setActiveInstallation(id, 0)}/>);
  return providerItems.concat(providers.map((provider) => <ListItem
                                                            primaryText={provider.name}
                                                            onTouchTap={() => setActiveInstallation(id, provider.id) }/> ));
}

export const LocationList = (props) => {
  return (
    <ListItem
      primaryText={props.installation.name}
      leftIcon={props.active ? <FolderOpen /> : <FolderClose />}
      open={props.active}
      onTouchTap={() => props.setActiveInstallation(props.installation.id, 0)}
      nestedItems={
        renderFolders(props.installation.providers, props.installation.id, props.setActiveInstallation)
      }
    />
  )
};

export default LocationList
