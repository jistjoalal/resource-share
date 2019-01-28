import { Meteor } from 'meteor/meteor';

import '../imports/config/simple-schema-config';

import { resetResources, insertResources } from '../imports/api/sources';

Meteor.startup(() => {
  resetResources(() => insertResources());
});
