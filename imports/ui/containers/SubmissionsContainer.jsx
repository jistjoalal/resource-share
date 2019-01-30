import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Resources from '../../api/resources';

import ResourceList from '../components/ResourceList';

export default SubmissionsContainer = withTracker(({ match }) => {
  // resources favorited by user specified in route
  const { userId } = match.params;
  const query = { authorId: userId };
  const page = Session.get('page');
  Meteor.subscribe('resources', query, page); 
  const resources = Resources.find().fetch();

  // username
  Meteor.subscribe('userData', userId);
  const user = Meteor.users.find().fetch()[0];

  // page stats
  Meteor.call('resources.count', query, (err, res) => {
    if (!err) Session.set('total', res);
  });
  const limit = 10 * page;
  const total = Session.get('total');
  const title = "submissions";

  // disable add form
  const add = false;

  return { user, title, resources, limit, total, add };
})(ResourceList);
