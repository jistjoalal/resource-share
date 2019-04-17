import React from 'react';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Helmet } from 'react-helmet';
import { Session } from 'meteor/session';

import ResourceList from '../containers/ResourceListContainer';
import QuerySelect from './QuerySelect';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    props.KEYS.forEach(key => this.state[key] = null);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) this.setStateFromRoute(id.split('.')); 
    else this.setQuery();
  }
  setStateFromRoute = (vals, i = 0) => {
    if (vals[0]) {
      const { KEYS } = this.props;
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
    const { KEYS, STDS } = this.props;
    if (key === KEYS[0]) return STDS;
    const prevKey = KEYS[KEYS.indexOf(key) - 1];
    return this.state[prevKey];
  }
  render() {
    const { KEYS, STDS, query } = this.props;
    const invalidCode = !/^(Math|ELA)(\/|\/\w+(\.(\w|-)+)*)*$/.test(query);
    return (
      <>
        <Helmet>
          <title>{query}</title>
        </Helmet>

        {invalidCode &&
          <p className="alert alert-warning">
            Invalid Standard Code: {query}
          </p>
        }

        <QuerySelect
          change={this.changeKey}
          STDS={STDS}
          KEYS={KEYS}
          state={this.state}
        /> 
        
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
      const { KEYS } = this.props;
      const idx = KEYS.indexOf(key);
      if (idx < KEYS.length - 1) {
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
    const { subject } = this.props;
    this.props.history.replace(`/cc/${subject}/${keys}`);
    this.setQuery();
    // reset page
    Session.set('page', 1);
  }
  setQuery = () => {
    const query = {};
    const { KEYS, subject } = this.props;
    query.subject = subject;
    // all keys in state are reflected in query (by code)
    KEYS.forEach(key => {
      if (this.state[key])
        query[key] = this.state[key].code;
    });
    const queryString = this.props.history.location.pathname.split('/cc/')[1];
    Session.set('query', queryString);
  }
}

const withQuery = withTracker(_ => {
  const query = Session.get('query');
  return { query };
});

export default withRouter(withQuery(App));
