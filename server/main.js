import { Meteor } from 'meteor/meteor';

import '../imports/config/simple-schema-config';
import '../imports/api/users';
import '../imports/api/resources';
import '../imports/api/descriptions';
import '../imports/api/descriptions/load';
import '../imports/api/comments';
import '../imports/api/s3';

// dev stuff
import { resetResources, insertResources, restoreIfEmpty } from '../imports/api/sources';

Meteor.startup(() => {
  // restoreIfEmpty();

  // dev stuff
  // resetResources();
  // resetResources(insertResources);
  // resetResources(restoreIfEmpty);
});
