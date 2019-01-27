import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Session } from 'meteor/session';

const ReferrerLink = ({ to, children, history }) => {
  Session.set({ from: history.location.pathname });
  return (
    <Link to={to} >
      {children}
    </Link>
  )
}

export default withRouter(ReferrerLink);
