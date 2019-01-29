import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Resources from '../../api/resources';

import Resource from '../components/Resource';

class Favorites extends React.Component {
  componentDidMount() {
    Session.set('page', 1);
  }
  render () {
    const { user, resources } = this.props;
    if (!resources || !user) return null;
    const username = user.emails[0].address;
    return (
      <div>
        <h2>{username}'s favorites</h2>
        <Link to="/">Home</Link>
        {this.renderFavorites()}
        {this.renderPageMenu()}
      </div>
    );
  }
  renderPageMenu() {
    const { limit, total } = this.props;
    const amt = limit > total ? total : limit;
    return (
      <div>
        {total > 0 ?
          <p>{`${amt}/${total}`} resources</p>
        : <p>No Favorites Yet!</p>}

        {limit < total &&
          <button onClick={this.nextPage}>More</button>}
      </div>
    )
  }
  renderFavorites() {
    return this.props.resources.map(resource => {
      return (
        <Resource key={resource._id} _id={resource._id} />
      );
    });
  }
  nextPage = () => {
    const page = Session.get('page'); 
    Session.set('page', page + 1);
  }
}

const FavoritesContainer = withTracker(({ match }) => {
  // resources favorited by user specified in route
  const { userId } = match.params;
  const query = { favoritedBy: { $elemMatch: { $eq: userId } } };
  const page = Session.get('page');
  Meteor.subscribe('resources', query, page); 
  const resources = Resources.find().fetch();

  // username
  Meteor.subscribe('userData', userId);
  const user = Meteor.users.find().fetch()[0];

  // page stats
  Meteor.call('resources.count', query, (err, res) => {
    if (!err) Session.set('total', res);
  });
  const limit = 10 * page;
  const total = Session.get('total');

  return { user, resources, limit, total };
})(Favorites);

export default withRouter(FavoritesContainer);
