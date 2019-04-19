import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import LogoutButton from './LogoutButton';
import { NavItem, NavLink } from './Nav';

const LoggedInLinks = ({ userId }) =>
  <>
    <NavItem>
      <NavLink to={`/favorites/${userId}`}>
        My Favorites
      </NavLink>
    </NavItem>
      
    <NavItem>
      <NavLink to={`/submissions/${userId}`}>
        My Submissions
      </NavLink>
    </NavItem>

    <NavItem>
      <LogoutButton />
    </NavItem>
  </>

export default withTracker(_ => {
  const userId = Meteor.userId();
  return { userId };
})(LoggedInLinks);
