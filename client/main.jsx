import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import '../imports/config/simple-schema-config';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import App from '/imports/ui/App'
import Signup from '/imports/ui/Signup'
import Login from '/imports/ui/Login'

const Routes = () =>
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <PublicRoute path="/login" component={Login} />
      <PublicRoute path="/signup" component={Signup} />
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

Meteor.startup(() => {
  render(<Routes />, document.getElementById('react-target'));
});
