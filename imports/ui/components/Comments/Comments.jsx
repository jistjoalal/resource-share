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
    const stdUrl = '/cc/' + resource.code;
    return (
      <div className="container">
        <div className="row d-flex flex-column border shadow-sm p-2">

          <Helmet>
            <title>{resource.title}</title>
          </Helmet>

          <div>
            <a href={resource.url} target="_blank">
              <h2>{resource.title}</h2>
            </a>

            <h4>
              <Link to={stdUrl} className="text-muted">
                {resource.code}
              </Link>
            </h4>
          </div>
          
          <p className="mb-0 text-secondary">
          
            <FavoriteButton resource={resource} user={user} />

            <span className="mx-2">
              Submitted by:
            </span>
            
            <Link to={`/submissions/${resource.authorId}`}>
              {resource.username}
            </Link>

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
