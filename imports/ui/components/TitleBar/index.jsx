import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import LogoutButton from './LogoutButton';
import AddResource from './AddResource';
import InstallButton from './InstallButton';

class TitleBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: true,
    };
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
  render() {
    const { title, userId, query } = this.props;
    const homeTo = Object.values(query || {}).join('.');
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <Link className="nav-link" to={`/cc/${homeTo}`} onClick={this.clearMessage}>
            <span className="navbar-brand text-white">
              {title}
            </span>
          </Link>

          <InstallButton />

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav flex-grow-1">
              {!userId &&
              <>
                <li className="nav-item">
                  <button className="btn" onClick={this.clearMessage}>
                    <LoginButton />
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn" onClick={this.clearMessage}>
                    <SignupButton />
                  </button>
                </li>
              </>}

              {!!userId &&
                <>
                  <li className="nav-item">
                    <button className="btn" onClick={this.clearMessage}>
                      <Link className="nav-link" to={`/favorites/${userId}`}>My Favorites</Link>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="btn" onClick={this.clearMessage}>
                      <Link className="nav-link" to={`/submissions/${userId}`}>My Submissions</Link>
                    </button>
                  </li>
                  <li className="nav-item" onClick={this.clearMessage}>
                    <button className="btn">
                      <LogoutButton />
                    </button>
                  </li>
                </>}
            </ul>

            {!!userId && query && query.grade &&
              <AddResource />}
          </div>
        </nav>
        {this.renderMessage()}
      </div>
    );
  }
  renderMessage() {
    const { message } = this.props;
    const { showMessage } = this.state;
    return !!message && showMessage && (
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        {message}
        <button type="button" className="close" onClick={this.clearMessage}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

export default container = withTracker(() => {
  const query = Session.get('query');
  const userId = Meteor.userId();
  const message = Session.get('message');
  return { query, userId, message };
})(TitleBar);