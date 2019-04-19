import React from 'react';

import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import { NavItem } from './Nav';

export default LoggedOutLinks = _ =>
  <>
    <NavItem>
      <LoginButton />
    </NavItem>

    <NavItem>
      <SignupButton />
    </NavItem>
  </>
