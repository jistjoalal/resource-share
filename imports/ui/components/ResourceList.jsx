import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Resources from '../../api/resources';

class ResourceList extends React.Component {
  render() {
    const { resources } = this.props;
    return resources.map(r =>
      <li key={r._id}>
        <a href={r.url}>{r.title}</a>
      </li>
    );
  }
}

export default withTracker(({ query, page }) => {
  Meteor.subscribe('resources');
  if (query) {
    return {
      resources: Resources.find(
        { ...query },
        {
          limit: 10 * (page + 1),
        },
      ).fetch(),
    };
  }
  else return {
    resources: Resources.find({}, { limit: 10 }).fetch(),
  };
})(ResourceList);
