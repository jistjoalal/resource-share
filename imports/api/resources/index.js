import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

import "./methods";

export default Resources = new Mongo.Collection("resources");

if (Meteor.isServer) {
  Meteor.publish("resources", (query, page) => {
    check(query, Object);
    check(page, Number);
    return Resources.find(query, {
      sort: { score: -1, createdAt: 1 },
      limit: page * 10
    });
  });
}
