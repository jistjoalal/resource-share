import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Resources from '../../api/resources';

import Resource from './Resource';

class ResourceList extends React.Component {
  componentDidMount() {
    Session.set('page', 1);
  }
  render() {
    return (
      <div>
        {this.renderHeaders()}
        {this.renderResources()}
        {this.renderPageMenu()}
      </div>
    );
  }
  renderPageMenu() {
    const { limit, total } = this.props;
    const amt = limit > total ? total : limit;
    return (
      <div>
        {!!total ?  // hacky - depends on resource existing for each standard
          <p>{`${amt}/${total}`} resources</p>
        : <p>Loading...</p>}

        {limit < total &&
          <button onClick={this.nextPage}>More</button>}
      </div>
    )
  }
  renderResources() {
    return this.props.resources.map(r =>
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
  // resources (matching query + page)
  Meteor.subscribe('resources', Session.get('query'), Session.get('page'));
  const resources = Resources.find().fetch();

  // total # resources matching query
  Meteor.call('resources.count', Session.get('query'), (err, res) => {
    if (!err) Session.set('total', res);
  });

  // page stats
  const limit = 10 * Session.get('page');
  const total = Session.get('total');

  return { resources, limit, total };
})(ResourceList);
