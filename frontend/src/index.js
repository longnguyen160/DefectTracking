import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import 'font-awesome/css/font-awesome.min.css';
import SignIn from './modules/account/components/SignIn';
import SignUp from './modules/account/components/SignUp';
import configureStore from './store/configureStore';
import MainLayout from './modules/layout/components/MainLayout';
import './index.css';
import Projects from './modules/projects/components/Projects';
import Home from './modules/home/components/Home';

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
          </Switch>
        </MainLayout>
      </Switch>
    </Router>
  </Provider>
  , document.getElementById('root')
);
// registerServiceWorker();
