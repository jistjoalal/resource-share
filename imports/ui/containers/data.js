import { Meteor } from "meteor/meteor";

import Resources from "../../api/resources";

// props for ResourceList component
export const resources = query => {
  const page = Session.get("page") || 1;
  const resourcesHandle = Meteor.subscribe("resources", query, page);
  const resources = Resources.find().fetch();

  // loading + ready
  const loading = !resourcesHandle.ready();

  // page stats
  if (!loading) {
    // only serve total count when done loading
    Meteor.call("resources.count", query, (err, res) => {
      if (!err) Session.set("total", res);
    });
  }
  const limit = 10 * page;
  const total = Session.get("total");

  return { resources, loading, limit, total };
};

// current user
export const currentUser = _ => {
  // user data
  Meteor.subscribe("userData", Meteor.userId());
  const user = Meteor.users.findOne({ _id: Meteor.userId() });
  return { user };
};

// 'username' field of user
export const author = userId => {
  // author data
  Meteor.subscribe("userData", userId);
  const authorUser = Meteor.users.findOne({ _id: userId });
  const author = authorUser ? authorUser.emails[0].address : "Jist";
  return { author };
};
