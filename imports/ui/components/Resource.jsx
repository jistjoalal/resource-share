import React from 'react';
import { Link } from 'react-router-dom';

export default class Resource extends React.Component {
  render() {
    if (!this.props.resource) return null;

    const { resource } = this.props;
    return (
      <div className="Resource row p-1">
        <span className="col-2 d-flex align-items-center">
          {this.favoriteButton()}
          <span>{resource.score}</span>
        </span>

        <span className="col-7 d-flex align-items-center text-truncate">
          <a href={resource.url} className="text-truncate">
            {resource.title}
          </a>
        </span>
        
        <Link className="col-3 d-flex align-items-center text-secondary text-truncate"
          to={`/submissions/${resource.authorId}`}
        >
          {resource.username}
        </Link>
      </div>
    )
  }
  favoriteButton = () => {
    const { resource, user } = this.props;
    if (!user) return null;
    return (
      (user.favorites && user.favorites.includes(resource._id) ?
        <a className="fav btn text-danger p-0 mb-1" onClick={this.unFav}>♥</a>
      : <a className="fav btn text-secondary p-0 mb-1" onClick={this.favorite}>♥</a>)
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
