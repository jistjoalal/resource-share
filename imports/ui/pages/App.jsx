import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Standards from '../../api/standards';

import AddResource from '../components/AddResource';
import ResourceList from '../components/ResourceList';
import QuerySelect from '../components/QuerySelect';
import LogoutButton from '../components/LogoutButton';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: '',
      domain: '',
      cluster: '',
      standard: '',
      component: '',
    }
  }
  componentDidMount() {
    const routeId = this.props.match.params.id;
    if (routeId) {
      const keys = ['grade', 'domain', 'cluster', 'standard', 'component'];
      const vals = routeId.split('.'); 
      if (vals[0]) {
        this.change(keys[0], vals[0], false, () => {
          if (vals[1]) {
            this.change(keys[1], vals[1], false, () => {
              if (vals[2]) {
                this.change(keys[2], vals[2], false, () => {
                  if (vals[3]) {
                    this.change(keys[3], vals[3], false, () => {
                      if (vals[4]) {
                        this.change(keys[4], vals[4], false);
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    }
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
  change = (key, code, route=true, callback) => {
    const keys = ['grade', 'domain', 'cluster', 'standard', 'component'];
    let list = [];
    if (key === 'grade') {
      list = Standards;
    }
    else {
      const prevKey = keys[keys.indexOf(key) - 1];
      list = this.state[prevKey][`${key}s`];
    }
    this.removeKey(key);
    return this.setState({ [key]: list[code] }, () => this.route(route, callback));
  }
  route = (route, callback) => {
    // routing
    if (route) {
      const keys = Object.values(this.state).filter(String).map(v => v.code);
      this.props.history.replace(keys.join('.'));
    }
    if (callback) {
      callback();
    }
  }
  removeKey = key => {
    this.setState({ [key]: '' }, () => this.route(true));
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

export default withRouter(App);
