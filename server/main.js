import { Meteor } from 'meteor/meteor';

import '../imports/config/simple-schema-config';
import Resources from '/imports/api/resources';

Meteor.startup(() => {
  let once = false;
  if (!once) {
    // insert scraped resources here
  }
});
