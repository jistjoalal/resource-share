import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import './methods';

export default Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
  Meteor.publish('comments', resourceId => {
    return Comments.find({ resourceId });
  });
}

