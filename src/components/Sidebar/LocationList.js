import React from 'react'
import { IndexLink, Link } from 'react-router';
import './Sidebar.scss';

const ProviderList = (props) => (
    <li className={props.activeLocation == props.provider.id ? "activeISP" : ""}>
      <a onClick={() => props.setActiveInstallation(props.installationId, props.provider.id )}> {props.provider.name}</a>
    </li>
)

const renderProviders = (providers, installationId, activeLocation, setActiveInstallation) => {
  return providers.map((provider) => {
    return(
      <ProviderList
        provider={provider}
        installationId={installationId}
        key={'provider'+ provider.id}
        activeLocation={activeLocation}
        setActiveInstallation={setActiveInstallation}
      />
    )
  })
}

const renderFolders = (providers, id, activeLocation, setActiveInstallation) => (
  <ul>
    <li className={activeLocation == 0 ? "activeISP" : ""} >
      <a onClick={() => setActiveInstallation(id, 0 )} >General</a>
    </li>
    { renderProviders(providers, id, activeLocation, setActiveInstallation) }
  </ul>
)

export const LocationList = (props) => {
  return (
    <div className="location">
      <li className={ props.active && 'active'}>
        <a onClick={() => props.setActiveInstallation(props.installation.id, 0)} className="toggler">
          {props.active ? <i className="icon glyphicon glyphicon-folder-open"/> :
            <i className="icon glyphicon glyphicon-folder-close"/>}
          <span className="sidebar-installation-text">{props.installation.name}</span>
        </a>
      </li>
      {props.active && renderFolders(props.installation.providers, props.installation.id, props.activeLocation, props.setActiveInstallation)}
    </div>
  )
};

export default LocationList
