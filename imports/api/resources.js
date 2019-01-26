import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export default Resources = new Mongo.Collection('resources');

if (Meteor.isServer) {
  Meteor.publish('resources', () => {
    return Resources.find();
  });
}

Meteor.methods({
  'resources.new'(title, url, grade, domain, cluster, standard, component) {
    // if (!this.userId) throw new Meteor.Error('not authorized');

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
