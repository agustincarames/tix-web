import CreateInstallation from './Create/index';
import InstallationView from './components/Installations';

// Sync route definition
export default () => ({
  path: 'installation',
  component : InstallationView,
  childRoutes : [
    CreateInstallation()
  ]
})
