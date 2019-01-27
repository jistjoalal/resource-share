import React from 'react';
import { withRouter } from 'react-router-dom';
import { Session } from 'meteor/session';

import Standards from '../../api/standards';

import AddResource from '../components/AddResource';
import ResourceList from '../components/ResourceList';
import QuerySelect from '../components/QuerySelect';
import LogoutButton from '../components/LogoutButton';
import LoginButton from '../components/LoginButton';

const KEYS = ['grade', 'domain', 'cluster', 'standard', 'component'];

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
      const vals = routeId.split('.'); 
      this.setStateFromRoute(vals); 
    }
  }
  render() {
    const msg = Session.get('message');
    return (
      <div>
        <h1>Resource Share</h1>
        {!!Meteor.userId() ?
          <LogoutButton />
        : <LoginButton />}
        {msg && <p>{msg}</p>}
        <hr />

        <QuerySelect change={this.change} removeKey={this.removeKey} {...this.state} /> 
        <hr />

        {!!Meteor.userId() ?
          <AddResource {...this.state} />
        : <p>
            <LoginButton /> to submit a new Resource!
          </p>}
        <hr />

        <ResourceList query={this.query()} {...this.state} />
      </div>
    );
  }
  change = (key, code, route=true, callback) => {
    let list = [];
    // grade key selects node from root of curriculum
    if (key === 'grade') {
      list = Standards;
    }
    // other keys select node from child-nodes of curriculum
    else {
      const prevKey = KEYS[KEYS.indexOf(key) - 1];
      list = this.state[prevKey][`${key}s`];
    }
    // change key, updating route
    this.setState({ [key]: list[code] }, () => this.route(route, callback));
  }
  removeKey = key => {
    // remove key, updating route
    this.setState({ [key]: '' }, () => this.route(true));
    // remove sub-keys
    const idx = KEYS.indexOf(key);
    if (idx < KEYS.length - 1) {
      this.removeKey(KEYS[idx + 1]);
    }
  }
  route = (route, callback) => {
    // routing
    if (route) {
      const keys = Object.values(this.state).filter(String).map(v => v.code);
      this.props.history.replace(keys.join('.'));
    }
    // callback for setting state from route
    if (callback) callback();
  }
  query = () => {
    const query = {};
    // all keys in state are reflected in query (by code)
    KEYS.forEach(key => {
      if (this.state[key])
        query[key] = this.state[key].code;
    });
    return query;
  }
  setStateFromRoute = (vals, i = 0) => {
    if (vals[0]) {
      this.change(KEYS[i], vals[0], false, () => {
        this.setStateFromRoute(vals.slice(1), i + 1);
      });
    }
  }
}

export default withRouter(App);
