import React from 'react';

export default NavItem = ({ children }) =>
  <li className="nav-item">
    <button
      className="btn"
      onClick={_ => Session.set('message', '')}
    >
      {children} 
    </button>
  </li>
