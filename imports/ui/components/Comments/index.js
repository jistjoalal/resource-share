import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import moment from 'moment';

import AddComment from './AddComment';
import CommentList from './CommentList';
import FavoriteButton from '../FavoriteButton';
import DeleteButton from '../DeleteButton';

export default class CommentsPage extends React.Component {
  render() {
    const { resource, comments, user } = this.props;
    
    if (!resource) return (
      <div className="alert alert-warning">

        <Helmet>
          <title>Resource Not Found</title>
        </Helmet>

        <p className="lead">
          Resource Not Found
        </p>

        <Link to="/">Home</Link>
        
      </div>
    );
    
    const time = moment(resource.createdAt).fromNow();
    return (
      <div className="container">
        <div className="row d-flex flex-column border shadow-sm p-2">

          <Helmet>
            <title>{resource.title}</title>
          </Helmet>

          <div className="d-flex justify-content-between">
            <a href={resource.url} target="_blank">
              <h2>{resource.title}</h2>
            </a>

            <h4 className="text-muted">
              {resource.code}
            </h4>
          </div>
          
          <p className="mb-0 text-secondary">
          
            <FavoriteButton resource={resource} user={user} />

            <span className="mx-2">
              Submitted by:
            </span>
            
            <a href={`/submissions/${resource.authorId}`}>
              {resource.username}
            </a>

            <span className="mr-2"> - {time}</span>
            
            <DeleteButton resource={resource} user={user} />

          </p>

        </div>
        <CommentList comments={comments} /> 
        <AddComment resource={resource} /> 
      </div>
    );
  }
}