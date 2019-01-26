import React from 'react';
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

          <p>New Resource</p>

          <input type="text" name="title" placeholder="Title" /> 
          <input type="text" name="url" placeholder="URL" /> 

          <button type="submit">Submit</button>

        </form>

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
    // TODO: actual validation

    // required
    // if (url === '') return alert('no url');
    if (title === '') return alert('no title');
    if (!grade) return alert('no grade specified');
    if (!domain) return alert('no domain specified');
    if (!cluster) return alert('no cluster specified');
    // if (!standard) return alert('no standard');

    // optional
    const sv = (standard && standard.code) || '';
    const cv = (component && component.code) || '';

    // db
    Resources.insert({
      title: title.value,
      url: url.value,
      grade: grade.code,
      domain: domain.code,
      cluster: cluster.code,
      standard: sv,
      component: cv,
    }); 

    // reset form
    url.value = '';
    title.value = '';
  }
}

export default withTracker(({ query }) => {
  if (query) {
    return {
      resources: Resources.find(
        { ...query },
        { limit: 100 }, // TODO: actual pagination
      ).fetch(),
    };
  }
  else return {
    resources: Resources.find({}, { limit: 100 }).fetch(),
  };
})(ResourceList);