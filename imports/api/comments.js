import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export default Comments = new Mongo.Collection('comments');

const notAuthMsg = 'You must be logged in to do that.';
const notAuthErr = new Meteor.Error(notAuthMsg, notAuthMsg);

if (Meteor.isServer) {
  Meteor.publish('comments', resourceId => {
    return Comments.find({ resourceId });
  });
}

Meteor.methods({ 
  'comments.add'(text, resourceId) {
    if (!this.userId) throw notAuthErr;

    new SimpleSchema({
      text: {
        type: String,
        min: 1,
        max: 255,
      },
      resourceId: {
        type: String,
        min: 1,
      },
    }).validate({ text, resourceId });

    const username = Meteor.users.findOne({ _id: this.userId }).emails[0].address;

    Comments.insert({ text, resourceId, username, authorId: this.userId });
  },
  'comments.delete'(_id) {
    if (!this.userId) throw notAuthErr;

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
    }).validate({ _id });

    Comments.remove({ _id, authorId: this.userId });
  }
});
