import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Resources from '../../api/resources';

class Resource extends React.Component {
  render() {
    if (!this.props.resource) return null;

    const { resource, user } = this.props;
    const favorited = user && user.favorites ?
      user.favorites.includes(resource._id) : null;

    return (
      <div className="row border-bottom">
        <span className="col-2 text-danger text-truncate">
          <span>{resource.score}</span>
        </span>

        <span className="col-8 text-truncate">
          { favorited ?
            <button onClick={this.unFav}>&lt;/3</button>
          : <button onClick={this.favorite}>&lt;3</button>}

          <a href={resource.url} className="text-truncate">
            {resource.title}
          </a>
        </span>

        <span className="col text-secondary text-truncate">{resource.username}</span>
      </div>
    )
  }
  unFav = () => {
    const { _id } = this.props;
    Meteor.call('resources.downvote', _id);
  }
  favorite = () => {
    const { _id } = this.props;
    Meteor.call('resources.upvote', _id);
  }
}

export default withTracker(({ _id }) => {
  Meteor.subscribe('userData', Meteor.userId());
  const user = Meteor.users.find().fetch()[0];
  const resource = Resources.find({ _id }).fetch()[0];
  return { resource, user }
})(Resource);
