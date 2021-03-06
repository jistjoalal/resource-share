import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

export default DeleteButton = ({ user, resource }) => {

  if (!user || resource.authorId !== user._id) return null;
  
  const del = _ => {
    if (confirm('Really delete?')) {
      Meteor.call('resources.delete', resource._id);
      // reset message in the case that user just created
      Session.set('message', '');
    }
  }

  return (
    <button
      className="DeleteResource btn text-secondary p-0 mb-1"
      onClick={del}
    >
      <FaTrashAlt />
    </button>
  );
}
