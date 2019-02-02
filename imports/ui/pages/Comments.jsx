import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class Comments extends React.Component {
  render() {
    const { resource } = this.props;
    console.log(resource);
    return (
      <div>
        <p>comments here</p>
      </div>
    );
  }
}

export default withTracker(({ match }) => {
  const { resourceId } = match.params;
  const query = { _id: resourceId };
  const page = Session.get('page') || 1;
  const resourcesHandle = Meteor.subscribe('resources', query, page);
  const resource = Resources.findOne();
  return { resource };
})(Comments);
