import React from 'react';
import { Link } from 'react-router-dom';

import AddResource from './AddResource';
import ResourceList from './ResourceList';
import QuerySelect from './QuerySelect';
import LogoutButton from './LogoutButton';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: '',
      domain: '',
      cluster: '',
      standard: '',
      component: '',
    };
  }
  render() {
    return (
      <div>
        <h1>Resource Share</h1>
        {!!Meteor.userId() ?
          <LogoutButton />
        : <Link to="/login">Login</Link>}
        <hr />
        <QuerySelect change={this.change} removeKey={this.removeKey} {...this.state} /> 
        <hr />
        {!!Meteor.userId() &&
          <AddResource {...this.state} />}
        <hr />
        <ResourceList query={this.query()} {...this.state} />
      </div>
    )
  }
  change = (key, list) => e => {
    const title = e.target.value;
    this.setState({ [key]: list[title] });
  }
  removeKey = key => {
    this.setState({ [key]: '' });
    // remove sub-keys
    const keys = ['grade', 'domain', 'cluster', 'standard', 'component'];
    const idx = keys.indexOf(key);
    if (idx < keys.length - 1) {
      this.removeKey(keys[idx + 1]);
    }
  }
  query = () => {
    const { grade, domain, cluster, standard, component } = this.state;
    const query = {};
    if (grade) query.grade = grade.code;
    if (domain) query.domain = domain.code;
    if (cluster) query.cluster = cluster.code;
    if (standard) query.standard = standard.code;
    if (component) query.component = component.code;
    return query;
  }
}
