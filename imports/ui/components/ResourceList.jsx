import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Resources from '../../api/resources';

import Resource from './Resource';

class ResourceList extends React.Component {
  render() {
    const { limit, total } = this.props;
    const amt = limit > total ? total : limit;
    return (
      <div>
        {this.renderHeaders()}
        {this.renderResources()}

        {!!total ?  // hacky - depends on resource existing for each standard
          <p>{`${amt}/${total}`} resources</p>
        : <p>Loading...</p>}

        {limit < total &&
         <button onClick={this.nextPage}>More</button>}
      </div>
    );
  }
  renderResources() {
    const { resources, limit } = this.props;
    return resources.slice(0, limit).map(r =>
      <Resource key={r._id} _id={r._id} /> 
    );
  }
  renderHeaders() {
    return (
      <div className="row border-bottom">
        <span className="col-2 text-truncate">Score</span>
        <span className="col-8 text-truncate">Resource</span>
        <span className="col text-truncate">User</span>
      </div>
    )
  }
  nextPage = () => {
    const page = Session.get('page'); 
    Session.set('page', page + 1);
  }
}

export default ResourceListContainer = withTracker(() => {
  Meteor.subscribe('resources', Session.get('query'));

  const resources = Resources.find({},
    { sort: { score: -1 } },
  ).fetch();

  const total = resources.length;
  const limit = 10 * Session.get('page');
  return { resources, limit, total };
})(ResourceList);
