import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Resources from '../api/resources';

class ResourceList extends React.Component {
  render() {
    const { grade, domain, cluster, standard, component } = this.props;

    const baseUrl = 'http://www.corestandards.org/Math/Content/';

    let title = grade && grade.title;
    let code = grade && [`${grade.code}`];
    if (domain) {
      code.push(`${domain.code}`);
      title = domain.title;
    }
    if (cluster) {
      code.push(`${cluster.code}`);
      title = cluster.title;
    }
    if (standard) {
      code.push(`${standard.code}`);
      title = standard.title;
    }
    if (component) {
      code.push(`${component.code}`);
      title = component.title;
    }

    return (
      <div>
        <form onSubmit={this.newResource}>

          <h3>Submit New Resource</h3>

          <input type="text" name="title" placeholder="Title" /> 
          <input type="text" name="url" placeholder="URL" /> 

          <button type="submit">Submit</button>

        </form>

        <hr />

        <h3>Resources</h3>

        {code &&
          <a href={`${baseUrl}${code.join('/')}`}>
            {code.join('.')}
          </a>}

        {title && <p>{title}</p>}

        {this.renderResources()}
      </div>
    )
  }
  renderResources() {
    const { resources } = this.props;
    return resources.map(r =>
      <li key={r._id}>
        <a href={r.url}>{r.title}</a>
      </li>
    );
  }
  newResource = e => {
    e.preventDefault();
    const { grade, domain, cluster, standard, component } = this.props;
    const { url, title} = e.target;

    /* ghetto validation */ 

    // required
    // if (url === '') return alert('no url');
    if (title === '') return alert('no title');
    if (!grade) return alert('no grade specified');
    if (!domain) return alert('no domain specified');
    // if (!cluster) return alert('no cluster specified');
    // if (!standard) return alert('no standard');

    // optional
    const optCluster = (cluster && cluster.code) || '';
    const optStandard = (standard && standard.code) || '';
    const optComponent = (component && component.code) || '';


    // db
    Meteor.call('resources.new',
      title.value,
      url.value,
      grade.code,
      domain.code,
      optCluster,
      optStandard,
      optComponent,
    ); 

    // reset form
    url.value = '';
    title.value = '';
  }
}

export default withTracker(({ query }) => {
  Meteor.subscribe('resources');
  if (query) {
    return {
      resources: Resources.find(
        { ...query },
        { limit: 100 },
      ).fetch(),
    };
  }
  else return {
    resources: Resources.find({}, { limit: 100 }).fetch(),
  };
})(ResourceList);