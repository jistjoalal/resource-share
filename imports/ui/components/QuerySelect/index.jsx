/**
 * QuerySelect
 * - drop down select for curriculum standards query
 * - user is presented options from JSON hierarchy file
 * - selections will update query session object
 *   (used in App component)
 */
import React from 'react';

import MATH_STDS from '../../../api/ccssi/math-stds';

import Select from './Select';

export default class QuerySelect extends React.Component {
  render() {
    const { grade, domain, cluster, standard, component } = this.props;
    return (
      <div className="app-section bg-light p-1 border">

        <div className="d-flex flex-wrap">

          <this.selectInput
            name="grade"
            value={grade}
            options={MATH_STDS}
          />

          {grade &&
            <this.selectInput
              name="domain"
              value={domain}
              options={grade}
            />
          }

          {domain &&
            <this.selectInput
              name="cluster"
              value={cluster}
              options={domain}
            />
          }

          {cluster && 
            <this.selectInput
              name="standard"
              value={standard}
              options={cluster}
            />
          }

          {standard && Object.keys(standard).length > 1 &&
            <this.selectInput
              name="component"
              value={component}
              options={standard}
            />
          }
          
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
