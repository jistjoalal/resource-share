import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export default Resources = new Mongo.Collection('resources');

if (Meteor.isServer) {
  Meteor.publish('resources', (query, page) => {
    check(query, Object);
    check(page, Number);
    return Resources.find(
      query,
      { sort: { score: -1, title: -1 },
        limit: page * 10,
      },
    );
  });
}

const notAuthMsg = 'You must be logged in to do that.';
const notAuthErr = new Meteor.Error(notAuthMsg, notAuthMsg);

Meteor.methods({
  'resources.new'(title, url, grade, domain, cluster, standard, component) {

    if (!this.userId) throw notAuthErr;

    new SimpleSchema({
      title: {
        type: String,
        min: 1,
        max: 40,
      },
      url: {
        label: 'Your link',
        type: String,
        regEx: SimpleSchema.RegEx.Url,
      },
      grade: {
        type: String,
      },
      domain: {
        type: String,
      },
      cluster: {
        type: String,
        optional: true,
      },
      standard: {
        type: String,
        optional: true,
      },
      component: {
        type: String,
        optional: true,
      },
    }).validate({ title, url, grade, domain, cluster, standard, component })

    const username = Meteor.user().emails[0].address;
    const authorId = this.userId;
    const score = 0;
    const favoritedBy = [];
    const comments = [];
    Resources.insert({
      title,
      url,
      username,
      authorId,
      score,
      favoritedBy,
      comments,
      grade,
      domain,
      cluster,
      standard,
      component,
    });
  },
  'resources.delete'(_id) {
    if (!this.userId) throw notAuthErr;

    // user can only remove their own submissions
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
