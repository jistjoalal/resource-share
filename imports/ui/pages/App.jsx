import React from 'react';
import { withRouter } from 'react-router-dom';
import { Session } from 'meteor/session';

import GRADES from '../../api/grades';

import AddResource from '../components/AddResource';
import ResourceList from '../components/ResourceListContainer';
import QuerySelect from '../components/QuerySelect';
import LogoutButton from '../components/LogoutButton';
import LoginButton from '../components/LoginButton';

const KEYS = ['grade', 'domain', 'cluster', 'standard', 'component'];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    KEYS.forEach(key => this.state[key] = null);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) this.setStateFromRoute(id.split('.')); 
  }
  setStateFromRoute = (vals, i = 0) => {
    if (vals[0]) {
      this.setState({ [KEYS[i]]: this.getList(KEYS[i])[vals[0]] }, () => {
        this.setStateFromRoute(vals.slice(1), i + 1);
      });
    }
  }
  // returns list of vals for key
  // example: 'grade'   --> root of GRADES
  // example: 'domain'  --> GRADES[this.state.grade.code].domains
  // example: 'cluster' --> GRADES[grade.code].domains[domain.code].clusters
  // - (returns children of type key @ this.state's point in the curr. hierarchy)
  getList = key => {
    if (key === 'grade') return GRADES;
    const prevKey = KEYS[KEYS.indexOf(key) - 1];
    return this.state[prevKey][`${key}s`];
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

        <QuerySelect change={this.changeKey} remove={this.removeKey} {...this.state} /> 
        <hr />

        {!!Meteor.userId() ?
          <AddResource />
        : <p>
            <LoginButton /> to submit a new Resource!
          </p>}
        <hr />

        <ResourceList query={this.query()} />
      </div>
    );
  }
  changeKey = (key, code) => {
    // remove key, and sub-keys
    this.removeKey(key, () => {
      // change key, updating route
      this.setState({ [key]: this.getList(key)[code] }, () => this.route());
    });
  }
  removeKey = (key, callback) => {
    // remove key, updating route
    this.setState({ [key]: null }, () => {
      // remove sub-keys
      const idx = KEYS.indexOf(key);
      if (key !== 'component') {
        this.removeKey(KEYS[idx + 1], callback);
      }
      // callback at end of chain
      else {
        this.route();
        if (callback) callback();
      }
    });
  }
  route = () => {
    // get code from state
    const keys = Object.values(this.state)
      .filter(v => !!v).map(v => v.code).join('.');
    // apply to url
    this.props.history.replace(keys);
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
}

export default withRouter(App);
