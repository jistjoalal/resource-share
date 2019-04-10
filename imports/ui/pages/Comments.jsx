import React from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';

import Comments from '../../api/comments';

import AddComment from '../components/AddComment';
import CommentList from '../components/CommentList';
import FavoriteButton from '../components/FavoriteButton';
import DeleteButton from '../components/DeleteButton';

class CommentsPage extends React.Component {
  render() {
    const { resource, comments, user } = this.props;
    if (!resource) return (
      <div className="alert alert-warning">
        <p className="lead">Resource Not Found</p>
        <Link to="/">Home</Link>
      </div>
    );
    const time = moment(resource.createdAt).fromNow();
    return (
      <div className="container">
        <div className="row d-flex flex-column border shadow-sm p-2">

          <a href={resource.url} target="_blank">
            <h2>{resource.title}</h2>
          </a>
          
          <p className="mb-0 text-secondary">
          
            <FavoriteButton resource={resource} user={user} />

            <span className="mx-2">
              Submitted by:
            </span>
            
            <a href={`/submissions/${resource.authorId}`}>{resource.username}</a>

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

export default withTracker(({ match }) => {
  const { resourceId } = match.params;
  const query = { _id: resourceId };
  const page = Session.get('page') || 1;
  Meteor.subscribe('resources', query, page);
  const resource = Resources.findOne();

  // user data
  Meteor.subscribe('userData', Meteor.userId());
  const user = Meteor.users.find().fetch()[0];

  if (resource) {
    Meteor.subscribe('comments', resource._id);
  }
  const comments = Comments.find().fetch();
  return { resource, comments, user };
})(CommentsPage);
