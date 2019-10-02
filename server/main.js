import { Meteor } from "meteor/meteor";

import "../imports/config/simple-schema-config";
import "../imports/api/users";
import "../imports/api/resources";
import "../imports/api/descriptions";
import "../imports/api/comments";
import "../imports/api/s3";
import loadDescriptions from "../imports/api/descriptions/load";

// dev stuff
import {
  resetResources,
  insertMathResources,
  restoreIfEmpty
} from "../imports/api/sources";

Meteor.startup(() => {
  // restoreIfEmpty();
  // loadDescriptions();
  // dev stuff
  // insertMathResources();
  // resetResources();
  // resetResources(insertMathResources);
  // resetResources(restoreIfEmpty);
});
