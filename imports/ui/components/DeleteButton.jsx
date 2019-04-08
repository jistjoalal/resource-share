import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

export default DeleteButton = ({ user, resource }) => {
  if (!user || resource.authorId !== user._id) return null;
  const del = _ => {
    const really = confirm('Really delete?');
    if (really) Meteor.call('resources.delete', resource._id);
  }
  return (
    <button className="btn text-secondary p-0 mb-1" onClick={del}>
      <FaTrashAlt />
    </button>
  );
}
