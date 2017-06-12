import HomeView from './components/HomeView'
import DashboardView from './Dashboard/index';
import AdminView from './Admin/index';
import InstallationView from './Installation/index';
import AccountView from './Account/index';

// Sync route definition
export default () => ({
  path: 'home',
  component : HomeView,
  childRoutes : [
    DashboardView(),
    AdminView(),
    InstallationView(),
    AccountView()
  ]
})
