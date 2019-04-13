/**
 * QuerySelect
 * - drop down select for curriculum standards query
 * - user is presented options from JSON hierarchy file
 * - selections will update query session object
 *   (used in App component)
 */
import React from 'react';

import Select from './Select';

export default class QuerySelect extends React.Component {
  render() {
    const {
      STDS,
      KEYS,
      state,
    } = this.props;
    return (
      <div className="app-section bg-light p-1 border">

        <div className="d-flex flex-wrap">

          <this.selectInput
            name={KEYS[0]}
            value={state[KEYS[0]]}
            options={STDS}
          />

          {KEYS.slice(0,-1).map((k, i) =>
            state[k] && Object.keys(state[k]).length > 1 &&
              <this.selectInput
                key={i}
                name={KEYS[i+1]}
                value={state[KEYS[i+1]]}
                options={state[k]}
              />
          )}

        </div>
      </div>
    );
  }
  selectInput = ({ name, value, options }) => {

    // filter std code from options
    const opts = Object.entries(options || {}).filter(([k]) => {
      return k !== 'code';
    }).reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});
    
    return (
      <Select
        name={name}
        value={(value && value.code) || ''}
        options={opts}
        title={name[0].toUpperCase() + name.slice(1)}
        onChange={e => this.props.change(name, e.target.value)}
      />
    );
  }
}
