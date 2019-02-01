import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import TitleBar from './ui/components/TitleBar';
import App from './ui/pages/App';
import Signup from './ui/pages/Signup';
import Login from './ui/pages/Login';
import NotFound from './ui/pages/NotFound';
import Favorites from './ui/pages/Favorites';
import Submissions from './ui/pages/Submissions';

export default Routes = () =>
  <Router>
    <div>
      <TitleBar title="Resource Share" />

      <Switch>
        {/* Public Only */}
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/signup" component={Signup} />
        {/* Private Only */}

        {/* Public/Private */}
        <Route path="/" exact component={App} />
        <Route path="/favorites/:userId" component={Favorites} />
        <Route path="/submissions/:userId" component={Submissions} />
        <Route path="/cc/:id" component={App} />
        <Route path="/cc" component={App} />
        {/* Default */}
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>

const PublicRoute = ({ ...rest }) =>
  <AuthRoute condition={!Meteor.userId()}
    pathname="/" {...rest} />

const AuthRoute = ({ component: Component, condition, pathname, ...rest }) =>
  <Route render={props => condition ?
    <Component {...props} />
    : <Redirect to={{ pathname }} />
  } {...rest} />