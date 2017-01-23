import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Landing from './Landing'
import AboutRoute from './About'
import HomeRoute from './Home';

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Landing,
  childRoutes : [
    AboutRoute(),
    HomeRoute(),
  ]
});

export default createRoutes
