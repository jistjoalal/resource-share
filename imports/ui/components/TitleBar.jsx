import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import AddResource from '../components/AddResource';

class TitleBar extends React.Component {
  render() {
    const { query } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <a className="nav-link" href="/">
            <span className="navbar-brand text-white">
              {this.props.title}
            </span>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <button className="btn">
                </button>
              </li>

              {!Meteor.userId() &&
                <li className="nav-item">
                  <button className="btn">
                    <LoginButton />
                  </button>
                </li>}

              {!!Meteor.userId() &&
                <>
                  <li className="nav-item">
                    <button className="btn">
                      <Link className="nav-link" to={`/favorites/${Meteor.userId()}`}>My Favorites</Link>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="btn">
                      <Link className="nav-link" to={`/submissions/${Meteor.userId()}`}>My Submissions</Link>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="btn">
                    <LogoutButton />
                    </button>
                  </li>
                </>}
            </ul>

            {!!Meteor.userId() && query && query.grade &&
              <AddResource />}
          </div>
        </nav>
      </div>
    );
  }
}

export default container = withTracker(() => {
  const query = Session.get('query');
  return { query };
})(TitleBar);
