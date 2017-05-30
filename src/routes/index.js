import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Landing from './Landing'
import AboutRoute from './About'
import HomeRoute from './Home';
import RegisterRoute from './Register';
import InstallationRoute from './Installation';

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Landing,
  childRoutes : [
    AboutRoute(),
    HomeRoute(),
    RegisterRoute(),
    InstallationRoute(),
  ]
});

export default createRoutes
