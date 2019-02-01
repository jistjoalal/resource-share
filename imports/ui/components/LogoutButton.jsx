import React from 'react';
import { withRouter } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

class LogoutButton extends React.Component {
  render() {
    return (
      <a className="nav-link" href="#" onClick={this.logout}>Logout</a>
    );
  }
  logout = () => {
    Accounts.logout(() => {
      // "refresh page" to re-render components
      const { pathname } = this.props.history.location;
      this.props.history.push(pathname);
    });
  }
}

export default withRouter(LogoutButton);
