import { withTracker } from 'meteor/react-meteor-data';

import Comments from '../../api/comments';

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
});
