import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Resources from '../../api/resources';

import ResourceList from '../components/ResourceList';

export default ResourceListContainer = withTracker(() => {
  // resources (matching query + page)
  const query = Session.get('query');
  const page = Session.get('page');
  Meteor.subscribe('resources', query, page);
  const resources = Resources.find().fetch();

  // page stats
  Meteor.call('resources.count', query, (err, res) => {
    if (!err) Session.set('total', res);
  });
  const limit = 10 * page;
  const total = Session.get('total');
  const title = "resources";

  // enable add form
  const add = true;

  return { resources, limit, total, title, add };
})(ResourceList);
