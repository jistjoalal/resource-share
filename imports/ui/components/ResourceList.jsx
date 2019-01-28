import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Resources from '../../api/resources';

class ResourceList extends React.Component {
  render() {
    return (
      <div>
        <h3>Resources</h3>

        {this.renderResources()}
      </div>
    );
  }
  renderResources() {
    const { resources } = this.props;
    return resources.map(r =>
      <li key={r._id}>
        <a href={r.url}>{r.title}</a>
      </li>
    );
  }
} 

export default withTracker(({ query }) => {
  Meteor.subscribe('resources');
  if (query) {
    return {
      resources: Resources.find(
        { ...query },
        {
          limit: 100,
          sort: { title: 1 },
        },
      ).fetch(),
    };
  }
  else return {
    resources: Resources.find({}, { limit: 100 }).fetch(),
  };
})(ResourceList);