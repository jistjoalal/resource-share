import React from 'react';
import { FaHeart } from 'react-icons/fa';

export default FavoriteButton = ({ resource, user }) => {

  if (!user) return null;

  const unFav = _ => Meteor.call('resources.downvote', resource._id);
  const favorite = _ => Meteor.call('resources.upvote', resource._id);

  const favd = user.favorites && user.favorites.includes(resource._id);
  const color = favd ? 'danger' : 'secondary';
  
  return (
    <a
      className={"Button text-" + color}
      data-cy="favorite"
      onClick={favd ? unFav : favorite}
    >
      <FaHeart />
    </a>
  )
}
