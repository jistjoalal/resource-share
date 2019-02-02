import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Session } from 'meteor/session';

const ReferrerLinkLOC = ({ to, children, history }) => {
  Session.set({ from: history.location.pathname });
  return (
    <Link to={to} className="nav-link">
      {children}
    </Link>
  );
}
const ReferrerLink = withRouter(ReferrerLinkLOC);

const SignupButton = () => <ReferrerLink to="/signup">Signup</ReferrerLink>

export default SignupButton;