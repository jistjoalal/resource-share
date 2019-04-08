import React from 'react';
import { FaHeart } from 'react-icons/fa';

export default FavoriteButton = ({ resource, user }) => {
  if (!user) return null;
  const unFav = () => {
    Meteor.call('resources.downvote', resource._id);
  }
  const favorite = () => {
    Meteor.call('resources.upvote', resource._id);
  }
  return (
    (user.favorites && user.favorites.includes(resource._id) ?
      <a className="fav btn text-danger p-0 mb-1" onClick={unFav}>
        <FaHeart />
      </a>
    : <a className="fav btn text-secondary p-0 mb-1" onClick={favorite}>
        <FaHeart />
      </a>
    )
  );
}
