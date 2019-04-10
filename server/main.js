import { Meteor } from 'meteor/meteor';

import '../imports/config/simple-schema-config';
import '../imports/api/users';
import '../imports/api/resources';
import '../imports/api/comments';
import '../imports/api/slingshot';

import { resetResources, insertResources, restoreIfEmpty } from '../imports/api/sources';
import { search, save, restore } from '../imports/api/sources/better.lesson';

Meteor.startup(() => {
  // restoreIfEmpty();

  // dev stuff
  // resetResources();
  // resetResources(() => insertResources());
  // resetResources(() => restoreIfEmpty());

  // search for BL id's
  // once they're found, no reason to search again
  // just run to find new standards
  // search(); 
  // save();

  // restore from backup if meteor reset
  // restore();
});
