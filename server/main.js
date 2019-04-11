import { Meteor } from 'meteor/meteor';

import '../imports/config/simple-schema-config';
import '../imports/api/users';
import '../imports/api/resources';
import '../imports/api/comments';
import '../imports/api/slingshot';

// dev stuff
// import { resetResources, insertResources, restoreIfEmpty } from '../imports/api/sources';
// import { search, save, restore } from '../imports/api/sources/better.lesson';
// import { search } from '../imports/api/sources/problem.attic';

Meteor.startup(() => {
  // restoreIfEmpty();

  // dev stuff
  // resetResources();
  // resetResources(() => insertResources());
  // resetResources(() => restoreIfEmpty());
});
