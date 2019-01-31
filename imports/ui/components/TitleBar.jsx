import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

export default class TitleBar extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>

        <Link to="/">Home</Link>

        {!!Meteor.userId() ?
          <LogoutButton />
        : <LoginButton />}

        {!!Meteor.userId() &&
          <div>
            <Link to={`/favorites/${Meteor.userId()}`}>My Favorites</Link>
            <Link to={`/submissions/${Meteor.userId()}`}>My Submissions</Link>
          </div>}
      </div>
    );
  }
}
