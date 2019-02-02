import React from 'react';
import { withRouter } from 'react-router-dom';
import { Session } from 'meteor/session';

import GRADES from '../../api/grades';

import ResourceList from '../containers/ResourceListContainer';
import QuerySelect from '../components/QuerySelect';

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
    else this.setQuery();
  }
  setStateFromRoute = (vals, i = 0) => {
    if (vals[0]) {
      const list = this.getList(KEYS[i])[vals[0]];
      this.setState({ [KEYS[i]]: list }, () => {
        this.setStateFromRoute(vals.slice(1), i + 1);
      });
    }
    else this.setQuery();
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
    return (
      <>
        <QuerySelect change={this.changeKey} {...this.state} /> 
        <ResourceList />
      </>
    );
  }
  changeKey = (key, code) => {
    // remove key, and sub-keys
    this.removeKey(key, () => {
      // change key, updating route
      this.setState({ [key]: this.getList(key)[code] }, () => {
        this.route();
      });
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
      // (only used for setting state from route,
      //  so no need to route in that case)
      else {
        if (callback) callback();
        else this.route();
      }
    });
  }
  route = () => {
    // get code from state
    const keys = Object.values(this.state)
      .filter(v => !!v).map(v => v.code).join('.');
    // apply to url
    this.props.history.replace(`/cc/${keys}`);
    this.setQuery();
  }
  setQuery = () => {
    const query = {};
    // all keys in state are reflected in query (by code)
    KEYS.forEach(key => {
      if (this.state[key])
        query[key] = this.state[key].code;
    });
    Session.set('query', query);
  }
}

export default withRouter(App);
