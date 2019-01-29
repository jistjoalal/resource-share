import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Resources from '../../api/resources';

import Resource from '../components/Resource';

class Favorites extends React.Component {
  render () {
    const { user, resources } = this.props;
    if (!resources || !user) return null;
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
    return this.props.resources.map(resource => {
      return (
        <Resource key={resource._id} _id={resource._id} />
      );
    });
  }
}

const FavoritesContainer = withTracker(({ match }) => {
  const { userId } = match.params;
  const query = { favoritedBy: { $elemMatch: { $eq: userId } } };
  const page = 1;
  Meteor.subscribe('resources', query, page); 
  const resources = Resources.find().fetch();

  Meteor.subscribe('userData', { _id: userId });
  const user = Meteor.users.find().fetch()[0];

  return { user, resources };
})(Favorites);

export default withRouter(FavoritesContainer);
