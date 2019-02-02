import React from 'react';
import { Link } from 'react-router-dom';

export default class Resource extends React.Component {
  render() {
    if (!this.props.resource) return null;

    const { resource } = this.props;
    return (
      <div className="Resource row p-2">
        <span className="col-2 d-flex align-items-center p-0">
          {this.favoriteButton()}
          <span className="text-truncate ml-1"> {resource.score}</span>
        </span>

        <span className="col-7 d-flex align-items-center p-0"> 
          <a href={resource.url} className="text-truncate"> 
            {resource.title}
          </a>
        </span>
        
        <Link className="col-2 d-flex align-items-center text-secondary text-truncate p-0"
          to={`/submissions/${resource.authorId}`}
        >
          {resource.username}
        </Link>

        <div className="col-1 d-flex align-items-center p-0">
          {this.deleteButton()}
        </div>
      </div>
    )
  }
  deleteButton = () => {
    const { user, resource } = this.props;
    if (resource.authorId !== user._id) return null;
    return (
      <button className="btn text-danger p-0 mb-0" onClick={this.delete}>&times;</button>
    );
  }
  delete = () => {
    const { resource } = this.props;
    const really = confirm('Really delete?');
    if (really) Meteor.call('resources.delete', resource._id);
  }
  favoriteButton = () => {
    const { resource, user } = this.props;
    if (!user) return null;
    return (
      (user.favorites && user.favorites.includes(resource._id) ?
        <a className="fav btn text-danger p-0 mb-1" onClick={this.unFav}>
          <div className="heart heart--red"></div> 
        </a>
      : <a className="fav btn text-secondary p-0 mb-1" onClick={this.favorite}>
          <div className="heart"></div> 
        </a>)
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
