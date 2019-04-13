import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import LogoutButton from './LogoutButton';
import AddResource from './AddResource';
import InstallButton from './InstallButton';
import ToggleButton from './ToggleButton';
import NavItem from './NavItem';

const NavLink = ({ children, ...rest }) =>
  <Link className="nav-link" {...rest}>
    {children}
  </Link>

class TitleBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: true,
    };
  }
  render() {
    const { title, userId, query, message } = this.props;
    const { showMessage } = this.state;
    const showAddResource = !!userId && query;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">

          <NavLink to="/">
            <span className="navbar-brand text-white">
              {title}
            </span>
          </NavLink>
          
          <InstallButton />

          <ToggleButton />

          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav flex-grow-1">

              { !userId && this.loggedOutLinks() }

              { !!userId && this.loggedInLinks() }

            </ul>

            { showAddResource && <AddResource /> }

          </div>

        </nav>

        {!!message && showMessage && this.renderMessage()}

      </div>
    );
  }
  loggedOutLinks() {
    return (
      <>
        <NavItem>
          <LoginButton />
        </NavItem>

        <NavItem>
          <SignupButton />
        </NavItem>
      </>
    )
  }
  loggedInLinks() {
    const { userId } = this.props;
    return (
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
    )
  }
  renderMessage() {
    const { message } = this.props;
    return (
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <span>{message}</span>

        <button
          type="button"
          className="close"
          onClick={this.clearMessage}
        >
          <span aria-hidden="true">
            &times;
          </span>
        </button>

      </div>
    );
  }
  // bootstrap + react is stupid
  // the way bootstrap closes the alert w/ jquery doesnt allow for it to be re-rendered
  // in the same session. (user logs in twice in same session)
  // the cmpWllRcvPrps is what bootstrap should have done
  // close is what the JS-enabled BS alert did, before I had to remove it.
  componentWillReceiveProps() {
    this.setState({ showMessage: true });
  }
  clearMessage = () => {
    Session.set('message', '');
    this.setState({ showMessage: false });
  }
}

export default container = withTracker(() => {
  const query = Session.get('query');
  const userId = Meteor.userId();
  const message = Session.get('message');
  return { query, userId, message };
})(TitleBar);
