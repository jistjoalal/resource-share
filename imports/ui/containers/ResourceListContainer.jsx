import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Resources from '../../api/resources';

import ResourceList from '../components/ResourceList';

export default ResourceListContainer = withTracker(() => {
  // resources (matching query + page)
  Meteor.subscribe('resources', Session.get('query'), Session.get('page'));
  const resources = Resources.find().fetch();

  // page stats
  Meteor.call('resources.count', Session.get('query'), (err, res) => {
    if (!err) Session.set('total', res);
  });
  const limit = 10 * Session.get('page');
  const total = Session.get('total');
  const title = "resources";

  return { resources, limit, total, title };
})(ResourceList);
