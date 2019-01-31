import React from 'react';

export default class Resource extends React.Component {
  render() {
    if (!this.props.resource) return null;

    const { resource } = this.props;
    return (
      <div className="row border-bottom">
        <span className="col-2 text-danger text-truncate">
          <span>{resource.score}</span>
        </span>

        <span className="col-8 text-truncate">
          {this.favoriteButton()}

          <a href={resource.url} className="text-truncate">
            {resource.title}
          </a>
        </span>

        <span className="col text-secondary text-truncate">{resource.username}</span>
      </div>
    )
  }
  favoriteButton = () => {
    const { resource, user } = this.props;
    return (user && user.favorites &&
      (user.favorites.includes(resource._id) ?
        <button onClick={this.unFav}>&lt;/3</button>
      : <button onClick={this.favorite}>&lt;3</button>)
    );
  }
  unFav = () => {
    const { _id } = this.props.resource;
    Meteor.call('resources.downvote', _id);
  }
  favorite = () => {
    const { _id } = this.props.resource;
    Meteor.call('resources.upvote', _id);
  }
}
