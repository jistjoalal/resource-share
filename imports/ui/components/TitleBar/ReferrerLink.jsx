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

export default ReferrerLink = withRouter(ReferrerLinkLOC);
