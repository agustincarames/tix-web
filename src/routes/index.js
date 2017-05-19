import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Landing from './Landing'
import AboutRoute from './About'
import HomeRoute from './Home';
import RegisterRoute from './Register';

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Landing,
  childRoutes : [
    AboutRoute(),
    HomeRoute(),
    RegisterRoute(),
  ]
});

export default createRoutes
