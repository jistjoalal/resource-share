import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import AddResource from '../components/AddResource';

class TitleBar extends React.Component {
  render() {
    const { query, userId } = this.props;
    const homeTo = Object.values(query || {}).join('.');
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <Link className="nav-link" to={`/cc/${homeTo}`}>
            <span className="navbar-brand text-white">
              {this.props.title}
            </span>
          </Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav flex-grow-1">
              {!userId &&
                <li className="nav-item">
                  <button className="btn">
                    <LoginButton />
                  </button>
                </li>}

              {!!userId &&
                <>
                  <li className="nav-item">
                    <button className="btn">
                      <Link className="nav-link" to={`/favorites/${userId}`}>My Favorites</Link>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="btn">
                      <Link className="nav-link" to={`/submissions/${userId}`}>My Submissions</Link>
                    </button>
                  </li>
                  <li className="nav-item">
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
      </div>
    );
  }
}

export default container = withTracker(() => {
  const query = Session.get('query');
  const userId = Meteor.userId();
  return { query, userId };
})(TitleBar);
