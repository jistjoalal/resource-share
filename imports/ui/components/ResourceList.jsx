import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Resources from '../../api/resources';

class ResourceList extends React.Component {
  render() {
    const { title, url, code } = this.titleUrlCode();
    return (
      <div>
        <h3>Resources</h3>

        {code &&
          <a href={url}>
            Official Standard 
          </a>}

        {code && <p>{code.join('.')}</p>}

        {title && <p>{title}</p>}

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
  titleUrlCode = () => {
    const { grade, domain, cluster, standard, component } = this.props;
    const baseUrl = 'http://www.corestandards.org/Math/Content/';
    let title = grade && grade.title;
    let code = (grade && [`${grade.code}`]) || [];
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
    let url = `${baseUrl}${code.join('/')}`;

    // grade standards index page is blank
    if (code.length < 2) url += '/introduction';
    return { title, url, code };
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