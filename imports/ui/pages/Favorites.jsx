import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Resource from '../components/Resource';

class Favorites extends React.Component {
  render () {
    const { user } = this.props;
    if (!user || !user.emails || !user.favorites) return null;

    const username = user.emails[0].address;
    return (
      <div>
        <h2>{username}'s favorites</h2>
        <Link to="/">Home</Link>
        {this.renderFavorites()}
      </div>
    );
  }
  renderFavorites() {
    return this.props.user.favorites.map(_id => {
      return (
        <Resource key={_id} _id={_id} />
      );
    });
  }
}

const FavoritesContainer = withTracker(({ match }) => {
  const { userId } = match.params;
  Meteor.subscribe('resources', {});
  Meteor.subscribe('userData', userId);
  const user = Meteor.users.find().fetch()[0];
  return { user };
})(Favorites);

export default withRouter(FavoritesContainer);
