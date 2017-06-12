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

export const LocationList = (props) => (
  <div className="location">
    <li className='active'>
      <a id="toggler" class="toggler">
        {props.active ? <i className="icon glyphicon glyphicon-folder-open" /> : <i className="icon glyphicon glyphicon-folder-close" />} {props.installation.name}
      </a>
    </li>
    <ul>
      <li>
        <Link to={`/home/report/${props.installation.id}/0`}>General</Link>
      </li>
      { props.active && renderProviders(props.installation.providers, props.installation.id) }
    </ul>
    <li className="divider"></li>
    <li >
      <a> Set as default installation <i class="icon-bookmark"></i> </a>
    </li>
  </div>
);

export default LocationList
