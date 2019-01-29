import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export default Resources = new Mongo.Collection('resources');

if (Meteor.isServer) {
  Meteor.publish('resources', (query) => {
    return Resources.find(query, {sort: {title: 1}});
  });
}

const notAuthMsg = 'You must be logged in to do that.';

Meteor.methods({
  'resources.new'(title, url, grade, domain, cluster, standard, component) {

    if (!this.userId) throw new Meteor.Error(notAuthMsg, notAuthMsg);

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
    Resources.insert({
      title,
      url,
      username,
      authorId,
      score,
      grade,
      domain,
      cluster,
      standard,
      component,
    });
  },
  'resources.upvote'(_id) {
    if (!this.userId) throw new Meteor.Error(notAuthMsg, notAuthMsg);
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
      },
    );
    Meteor.users.update(
      { _id: this.userId },
      {
        $addToSet: { favorites: _id }
      }
    );
  },
});
