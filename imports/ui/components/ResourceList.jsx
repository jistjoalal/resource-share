import React from 'react';
import { Tracker } from 'meteor/tracker';

import Resources from '../../api/resources';

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
  render() {
    const { limit, total } = this.state;
    const amt = limit > total ? total : limit;
    return (
      <div>
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
      <li key={r._id}>
        <a href={r.url}>{r.title}</a>
      </li>
    );
  }
  nextPage = () => {
    const page = Session.get('page'); 
    Session.set('page', page + 1);
  }
}
