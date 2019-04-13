import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import TitleBar from './ui/components/TitleBar';
import Home from './ui/pages/Home';
import CCMath from './ui/pages/CCMath';
import CCELA from './ui/pages/CCELA';
import Signup from './ui/pages/Signup';
import Login from './ui/pages/Login';
import NotFound from './ui/pages/NotFound';
import Favorites from './ui/pages/Favorites';
import Submissions from './ui/pages/Submissions';
import Comments from './ui/pages/Comments';

export default Routes = () =>
  <Router>
    <div>
      <TitleBar title="Resource Share" />

      <Switch>
        {/* Public (not logged in) Only */}
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/signup" component={Signup} />
        {/* Home */}
        <Route path="/" exact component={Home} />
        {/* User Favorites */}
        <Route path="/favorites/:userId" component={Favorites} />
        {/* User Submissions */}
        <Route path="/submissions/:userId" component={Submissions} />
        {/* Resource Comments */}
        <Route path="/comments/:resourceId" component={Comments} />
        {/* Common Core Math */}
        <Route path="/cc/Math/:id" component={CCMath} />
        <Route path="/cc/Math" component={CCMath} />
        {/* Common Core ELA */}
        <Route path="/cc/ELA/:id" component={CCELA} />
        <Route path="/cc/ELA" component={CCELA} />
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
