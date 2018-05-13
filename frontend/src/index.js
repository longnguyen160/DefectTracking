import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import SignIn from './components/account/SignIn';
import SignUp from './components/account/SignUp';

const history = createHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path="/signin" component={SignIn}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route
        path="/"
        render={() => (
          <App />
        )}
      />
    </Switch>
  </Router>
  , document.getElementById('root')
);
// registerServiceWorker();
