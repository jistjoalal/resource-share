import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Resources from '../../api/resources';

import ResourceList from '../components/ResourceList';

const withResources = withTracker(() => {
  // resources (matching query + page)
  const query = Session.get('query');
  const page = Session.get('page');
  const resourcesHandle = Meteor.subscribe('resources', query, page);
  let resources = Resources.find().fetch();

  // loading
  const loading = !resourcesHandle.ready();

  // user data
  Meteor.subscribe('userData', Meteor.userId());
  const user = Meteor.users.find().fetch()[0];

  // page stats
  Meteor.call('resources.count', query, (err, res) => {
    if (!err) Session.set('total', res);
  });
  const limit = 10 * page;
  const total = Session.get('total');
  const title = "Resources";

  return { resources, loading, limit, total, title, user };
})

export default withResources(ResourceList);
