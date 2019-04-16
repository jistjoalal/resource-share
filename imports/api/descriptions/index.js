import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export default Descriptions = new Mongo.Collection('descriptions');

if (Meteor.isServer) {
  Meteor.publish('descriptions', query => {
    check(query, Object);
    return Descriptions.find(
      query,
    );
  });
}
