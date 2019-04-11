import React from 'react';
import { FaComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import FavoriteButton from '../FavoriteButton';
import DeleteButton from '../DeleteButton';

export default class Resource extends React.Component {
  render() {
    if (!this.props.resource) return null;

    const { resource, user } = this.props;
    return (
      <div className="Resource row p-2">
        <span className="col-1 d-flex align-items-center p-0">
          <span className="text-truncate text-secondary">{resource.score}</span>
        </span>

        <span className="col-7 d-flex align-items-center p-0"> 
          <a href={resource.url} target="_blank" className="text-truncate"> 
            {resource.title}
          </a>
        </span>
        
        <Link className="col-2 d-flex align-items-center text-secondary text-truncate p-0"
          to={`/submissions/${resource.authorId}`}
        >
          {resource.username}
        </Link>

        <div className="col-2 d-flex align-items-center p-0">

          <FavoriteButton user={user} resource={resource} />
          
          <Link className="fav btn text-info p-0 mb-1" to={`/comments/${resource._id}`}>
            <FaComments />
          </Link>
          
          <DeleteButton user={user} resource={resource} />
          
        </div>
      </div>
    )
  }
}
