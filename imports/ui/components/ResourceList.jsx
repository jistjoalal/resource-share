import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import Resources from '../../api/resources';

import Resource from './Resource';

export default class ResourceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [],
      limit: 0,
      total: 0,
    };
  }
  componentDidMount() {
    this.resourcesTracker = Tracker.autorun(() => {
      Meteor.subscribe('resources', Session.get('query'));
      const resources = Resources.find().fetch();
      const total = resources.length;
      const limit = 10 * Session.get('page');
      this.setState({ resources, limit, total });
    });
  }
  componentWillUnmoun() {
    this.resourcesTracker.stop();
  }
  render() {
    const { limit, total } = this.state;
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
    const { resources, limit } = this.state;
    return resources.slice(0, limit).map(r =>
      <Resource key={r._id} resource={r} /> 
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
