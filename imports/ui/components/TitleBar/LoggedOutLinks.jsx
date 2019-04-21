import React from 'react';

import { NavItem } from './Nav';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';

export default LoggedOutLinks = _ =>
  <>
    <NavItem>
      <LoginButton />
    </NavItem>

    <NavItem>
      <SignupButton />
    </NavItem>
  </>
