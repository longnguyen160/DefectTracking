import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import MainLayout from './modules/layout/components/MainLayout';
import SignIn from './modules/account/components/SignIn';
import SignUp from './modules/account/components/SignUp';
import Projects from './modules/projects/components/Projects';
import Home from './modules/home/components/Home';
import UsersList from './modules/account/components/UsersList';
import IssueList from './modules/issue/components/IssueList';
import ProjectsManagement from './modules/management/components/ProjectsManagement';
import UsersManagement from './modules/management/components/UsersManagement';
import CategoriesManagement from './modules/management/components/CategoriesManagement';
import StatusManagement from './modules/management/components/StatusManagement';
import Dashboard from './modules/backlog/components/Dashboard';
import Summary from './modules/summary/components/Summary';
import KPIManagement from './modules/management/components/KPIManagement';

import 'font-awesome/css/font-awesome.min.css';
import 'react-table/react-table.css';
import './index.css';

export const history = createHistory();
export const store = configureStore();

export function loggedIn() {
  const state = store.getState();
  return state.account.isAuthenticated;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      loggedIn() ?
        (<Component {...props} />)
      : (<Redirect to="/signin" />)
    )}
  />
);


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route
          path="/signin"
          render={props => (
            loggedIn() ?
              (<Redirect to="/" />)
            : (<SignIn {...props} />)
          )}
        />
        <Route
          path="/signup"
          render={props => (
            loggedIn() ?
              (<Redirect to="/" />)
              : (<SignUp {...props} />)
          )}
        />
        <MainLayout>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/projects" component={Projects} />
            <PrivateRoute exact path="/project/:projectId?/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/project/:projectId?/summary" component={Summary} />
            <PrivateRoute exact path="/project/:projectId?/members" component={UsersList} />
            <PrivateRoute exact path="/issue/:issueId?" component={Home} />
            <PrivateRoute exact path="/manage/issues" component={IssueList} />
            <PrivateRoute exact path="/manage/projects" component={ProjectsManagement} />
            <PrivateRoute exact path="/manage/users" component={UsersManagement} />
            <PrivateRoute exact path="/manage/categories" component={CategoriesManagement} />
            <PrivateRoute exact path="/manage/status" component={StatusManagement} />
            <PrivateRoute exact path="/manage/kpi" component={KPIManagement} />
          </Switch>
        </MainLayout>
      </Switch>
    </Router>
  </Provider>
  , document.getElementById('root')
);
registerServiceWorker();
