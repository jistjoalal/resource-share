import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Comments from '../../api/comments';

import AddComment from '../components/AddComment';
import CommentList from '../components/CommentList';

class CommentsPage extends React.Component {
  render() {
    const { resource, comments } = this.props;
    if (!resource) return null;
    return (
      <div className="container">
        <div className="row d-flex flex-column border shadow-sm p-2">
          <a href={resource.url}>
            <h2>{resource.title}</h2>
          </a>
          <p className="lead mb-0 text-secondary">
            Submitted by <a href={`/submissions/${resource.authorId}`}>{resource.username}</a>
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
  const resourcesHandle = Meteor.subscribe('resources', query, page);
  const resource = Resources.findOne();

  if (resource) {
    Meteor.subscribe('comments', resource._id);
  }
  const comments = Comments.find().fetch();
  return { resource, comments };
})(CommentsPage);
