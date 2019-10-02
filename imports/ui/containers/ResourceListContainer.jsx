import { withTracker } from "meteor/react-meteor-data";

import { currentUser, resources } from "./data";

import ResourceList from "../components/ResourceList";

const withResources = withTracker(_ => {
  // resources (matching query + page)
  const queryString = Session.get("query") || "";
  const query = {
    code: {
      $regex: queryString
    }
  };

  return {
    title: "Resources",
    ...currentUser(),
    ...resources(query)
  };
});

export default withResources(ResourceList);
