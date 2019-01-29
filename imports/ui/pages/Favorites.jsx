import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';

import Resource from '../components/Resource';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        favorites: [],
        emails: [{}],
      },
    };
  }
  componentDidMount() {
    const { userId } = this.props.match.params;
    this.favoritesTracker = Tracker.autorun(() => {
      Meteor.subscribe('userData', userId);
      const user = Meteor.users.find().fetch()[0];
      if (user && user.favorites) {
        this.setState({ user });
      }
    });
  }
  componentWillUnmount() {
    this.favoritesTracker.stop();
  }
  render () {
    const { user } = this.state;
    const username = user.emails[0].address;
    console.log(user._id);
    return (
      <div>
        <h2>{username}'s favorites</h2>
        <Link to="/">Home</Link>
        {this.renderFavorites()}
      </div>
    );
  }
  renderFavorites() {
    return this.state.user.favorites.map(_id => {
      return (
        <Resource key={_id} _id={_id} />
      );
    });
  }
}

export default withRouter(Favorites);
