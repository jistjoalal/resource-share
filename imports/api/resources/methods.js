import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import RESOURCE_SCHEMA from './schema';
import { notAuthErr, notUniqErr } from '../helpers';

Meteor.methods({
  'resources.new'(resource, isFile=false) {

    if (!this.userId) throw notAuthErr;

    // url must be unique
    const url = resource.url;
    const resourceExists = Resources.findOne({ url });
    if (resourceExists) throw notUniqErr;

    RESOURCE_SCHEMA.validate(resource)

    const type = isFile ? url.slice(url.lastIndexOf`.` + 1) : 'URL';
    const username = Meteor.user().emails[0].address;
    const authorId = this.userId;
    const score = 0;
    const favoritedBy = [];
    const comments = [];
    const createdAt = new Date();
    return Resources.insert({
      ...resource,
      type,
      username,
      authorId,
      score,
      favoritedBy,
      comments,
      createdAt,
    });
  },
  'resources.delete'(_id) {
    if (!this.userId) throw notAuthErr;
    const resource = Resources.findOne({ _id });

    // user can only remove their own submissions
    if (resource.authorId !== this.userId) {
      throw notAuthErr;
    }
    // remove files from s3
    if (resource.url.includes('.amazonaws.com/')) {
      Meteor.call('s3.delete', resource.url);
    }

    Resources.remove({ _id, authorId: this.userId });
  },
  'resources.count'(query) {
    return Resources.find(query).fetch().length;
  },
  'resources.upvote'(_id) {
    if (!this.userId) throw notAuthErr;
    new SimpleSchema({
      _id: {
        type: String,
      },
    }).validate({ _id });

    // only allow favoriting once
    const favorites = Meteor.user().favorites || [];
    const voted = favorites.includes(_id);
    if (voted) return;

    Resources.update(
      { _id },
      {
        $inc: { score: 1 },
        $addToSet: { favoritedBy: this.userId },
      },
    );
    Meteor.users.update(
      { _id: this.userId },
      {
        $addToSet: { favorites: _id }
      }
    );
  },
  'resources.downvote'(_id) {
    if (!this.userId) throw notAuthErr;
    new SimpleSchema({
      _id: {
        type: String,
      },
    }).validate({ _id });

    // only allow un-favoriting once
    const favorites = Meteor.user().favorites || [];
    const voted = favorites.includes(_id);
    if (!voted) return;

    Resources.update(
      { _id },
      {
        $inc: { score: -1 },
        $pull: { favoritedBy: this.userId },
      },
    );
    Meteor.users.update(
      { _id: this.userId },
      {
        $pull: { favorites: _id }
      }
    );
  },
});
