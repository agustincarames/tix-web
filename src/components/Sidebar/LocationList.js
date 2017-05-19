import React from 'react'
import { IndexLink, Link } from 'react-router'

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
  <div>
    <li className=''>
      <a id="toggler" class="toggler active">

        <i className="icon-folder-open"></i>
        <i className="icon-folder-close"></i>

        {props.installation.name}
      </a>
    </li>
    <ul>
      {renderProviders(props.installation.providers)}
    </ul>
    <li className="divider"></li>
    <li >
      <a> Set as default installation <i class="icon-bookmark"></i> </a>
    </li>
  </div>
);

export default LocationList
