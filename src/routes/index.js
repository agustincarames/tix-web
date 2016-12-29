import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import AboutRoute from './About'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    AboutRoute(),
  ]
});

export default createRoutes
