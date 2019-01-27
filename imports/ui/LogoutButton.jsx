import React from 'react';
import { withRouter } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

class LogoutButton extends React.Component {
  render() {
    return (
      <button onClick={this.logout}>Logout</button>
    );
  }
  logout = () => {
    Accounts.logout(() => {
      this.props.history.push('/');
    });
  }
}

export default withRouter(LogoutButton);
