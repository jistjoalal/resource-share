import { Meteor } from 'meteor/meteor';

const notAuthMsg = 'You must be logged in to do that.';
export const notAuthErr = new Meteor.Error(notAuthMsg, notAuthMsg);

const notUniqMsg = 'Resource already exists.';
export const notUniqErr = ({ _id }) => {
  const msg = notUniqMsg + _id;
  return new Meteor.Error(msg, msg);
}
