import { Meteor } from 'meteor/meteor';

import '../imports/config/simple-schema-config';
import '../imports/api/users';

import { resetResources, insertResources } from '../imports/api/sources';
import { search, save, restore } from '../imports/api/sources/better.lesson';

Meteor.startup(() => {
  resetResources(() => insertResources());

  // restore from backup if meteor reset
  // restore();

  // search for BL id's
  // once they're found, no reason to search again
  // just run to find new standards
  // search(); 
});
