import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Resources from '../../api/resources';

import ResourceList from '../components/ResourceList';

const withFavorites = withTracker(({ match }) => {
  // resources favorited by user specified in route
  const { userId } = match.params;
  const query = { favoritedBy: { $elemMatch: { $eq: userId } } };
  const page = Session.get('page') || 1;
  const resourcesHandle = Meteor.subscribe('resources', query, page); 
  let resources = Resources.find().fetch();

  // loading + ready
  const loading = !resourcesHandle.ready();

  // user data
  Meteor.subscribe('userData', userId);
  const user = Meteor.users.find().fetch()[0];

  // page stats
  Meteor.call('resources.count', query, (err, res) => {
    if (!err) Session.set('total', res);
  });
  const limit = 10 * page;
  const total = Session.get('total');
  const title = "Favorites";

  return { resources, loading, limit, total, title, user };
});

export default withFavorites(ResourceList);
