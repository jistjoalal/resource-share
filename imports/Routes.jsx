import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import App from './ui/pages/App'
import Signup from './ui/pages/Signup'
import Login from './ui/pages/Login'

export default Routes = () =>
  <Router>
    <Switch>
      {/* Home */}
      <Route path="/" exact component={App} />
      {/* Accounts */}
      <PublicRoute path="/login" component={Login} />
      <PublicRoute path="/signup" component={Signup} />
      {/* Route By ID */}
      <Route path="/:id" component={App} />
      {/* Default */}
      <Route component={App} />
    </Switch>
  </Router>

const PublicRoute = ({ ...rest }) =>
  <AuthRoute condition={!Meteor.userId()}
    pathname="/" {...rest} />

const AuthRoute = ({ component: Component, condition, pathname, ...rest }) =>
  <Route render={props => condition ?
    <Component {...props} />
    : <Redirect to={{ pathname }} />
  } {...rest} />