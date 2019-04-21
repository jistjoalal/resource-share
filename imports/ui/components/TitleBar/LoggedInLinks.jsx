import React from 'react';

import { NavItem, NavLink } from './Nav';
import LogoutButton from './LogoutButton';

export default LoggedInLinks = ({ userId }) =>
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
