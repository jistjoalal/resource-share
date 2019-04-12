import { withTracker } from 'meteor/react-meteor-data';

import { currentUser } from './data';

import Comments from '../../api/comments';

export default withTracker(({ match }) => {
  const { resourceId } = match.params;
  const query = { _id: resourceId };
  const page = Session.get('page') || 1;
  Meteor.subscribe('resources', query, page);
  const resource = Resources.findOne();

  if (resource) {
    Meteor.subscribe('comments', resource._id);
  }
  const comments = Comments.find().fetch();
  return { ...currentUser(), resource, comments };
});
