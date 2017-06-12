import React from 'react'
import { IndexLink, Link } from 'react-router';
import './Sidebar.scss';

const ProviderList = (props) => (
    <li className="activeISP">
      <Link to={`/home/report/${props.installationId}/${props.provider.id}`}> {props.provider.name}</Link>
    </li>
)

const renderProviders = (providers, installationId) => {
  return providers.map((provider) => {
    return <ProviderList provider={provider} installationId={installationId} key={'provider'+provider.id} />
  })
}

const renderFolders = (providers, id) => (
  <ul>
    <li>
      <Link to={`/home/report/${id}/0`}>General</Link>
    </li>
    { renderProviders(providers, id) }
  </ul>
)

export const LocationList = (props) => (
  <div className="location">
    <li className={ props.active && 'active'}>
      <a onClick={() => props.setActiveInstallation(props.installation.id)} className="toggler">
        {props.active ? <i className="icon glyphicon glyphicon-folder-open" /> : <i className="icon glyphicon glyphicon-folder-close" />}
        <span className="sidebar-installation-text" >{props.installation.name}</span>
      </a>
    </li>
    {props.active && renderFolders(props.installation.providers, props.installation.id)}
  </div>
);

export default LocationList
