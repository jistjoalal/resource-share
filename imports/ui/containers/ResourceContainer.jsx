import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Resources from '../../api/resources';

import Resource from '../components/Resource';

export default withTracker(({ _id }) => {
  Meteor.subscribe('userData', Meteor.userId());
  const user = Meteor.users.find().fetch()[0];
  const resource = Resources.find({ _id }).fetch()[0];
  return { resource, user }
})(Resource);
