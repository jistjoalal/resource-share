import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export default Resources = new Mongo.Collection('resources');

if (Meteor.isServer) {
  Meteor.publish('resources', () => {
    return Resources.find();
  });
}

Meteor.methods({
  'resources.new'(title, url, grade, domain, cluster, standard, component) {
    // if (!this.userId) throw new Meteor.Error('not authorized');

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

    Resources.insert({
      title,
      url,
      grade,
      domain,
      cluster,
      standard,
      component,
    });
  },
});
