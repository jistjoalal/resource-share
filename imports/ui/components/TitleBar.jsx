import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

export default class TitleBar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <span className="navbar-brand">{this.props.title}</span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
               <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                {!!Meteor.userId() ?
                  <LogoutButton />
                : <LoginButton />}
              </li>
              {!!Meteor.userId() &&
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={`/favorites/${Meteor.userId()}`}>My Favorites</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={`/submissions/${Meteor.userId()}`}>My Submissions</Link>
                  </li>
                </>}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
