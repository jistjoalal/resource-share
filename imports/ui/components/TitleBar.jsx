import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import AddResource from '../components/AddResource';

export default class TitleBar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <span className="navbar-brand text-white">{this.props.title}</span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <button className="btn">
                  <Link className="nav-link" to="/">Home</Link>
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

            {!!Meteor.userId() && Session.get('query') && Session.get('query').grade &&
              <AddResource />}
          </div>
        </nav>
      </div>
    );
  }
}
