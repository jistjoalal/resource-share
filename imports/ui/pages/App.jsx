import React from 'react';
import { withRouter } from 'react-router-dom';
import { Session } from 'meteor/session';

import { KEYS, STDS } from '../../constants/standards';

import ResourceList from '../containers/ResourceListContainer';
import QuerySelect from '../components/QuerySelect';

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
  render() {
    return (
      <>
        <QuerySelect change={this.changeKey} {...this.state} /> 
        <ResourceList />
      </>
    );
  }
  /**
   * Routing
   */
  setStateFromRoute = (vals, i = 0) => {
    if (vals[0]) {
      const list = this.getList(KEYS[i])[vals[0]];
      this.setState({ [KEYS[i]]: list }, () => {
        this.setStateFromRoute(vals.slice(1), i + 1);
      });
    }
    else this.setQuery();
  }
  route = () => {
    // get code from state
    const keys = Object.values(this.state)
      .filter(v => !!v).map(v => v.code).join('.');
    // apply to url
    this.props.history.replace(`/cc/${keys}`);
    this.setQuery();
    // reset page
    Session.set('page', 1);
  }
  /**
   * Query Alteration
   */
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
  setQuery = () => {
    const query = {};
    // all keys in state are reflected in query (by code)
    KEYS.forEach(key => {
      if (this.state[key])
        query[key] = this.state[key].code;
    });
    Session.set('query', query);
  }
  // returns list of vals for key
  getList = key => {
    const { subject } = this.state;
    if (key === 'subject') return STDS;
    if (key === 'grade') return STDS[subject.code] || [];
    const prevKey = KEYS[KEYS.indexOf(key) - 1];
    return this.state[prevKey];
  }
}

export default withRouter(App);
