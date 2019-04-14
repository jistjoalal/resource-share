import React from 'react';
import { Link } from 'react-router-dom';

const reset = _ => {
  Session.set('message', '');
  Session.set('query', '');
}

export const NavLink = ({ children, ...rest }) =>
  <Link
    className="nav-link" {...rest}
    onClick={reset}
  >
    {children}
  </Link>

export const NavItem = ({ children }) =>
  <li className="nav-item">
    <button
      className="btn"
      onClick={reset}
    >
      {children} 
    </button>
  </li>
