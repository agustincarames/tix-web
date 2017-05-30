import React from 'react'
import { IndexLink, Link } from 'react-router';
import './Sidebar.scss';

const ProviderList = (props) => (
    <li>
      <a> {props.provider.name}</a>
    </li>
)

const renderProviders = (providers) => {
  return providers.map((provider) => {
    return <ProviderList provider={provider} key={'provider'+provider.id} />
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
      { props.active && renderProviders(props.installation.providers) }
    </ul>
    <li className="divider"></li>
    <li >
      <a> Set as default installation <i class="icon-bookmark"></i> </a>
    </li>
  </div>
);

export default LocationList
