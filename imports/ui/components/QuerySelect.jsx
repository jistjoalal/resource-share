import React from 'react';

import GRADES from '../../api/grades';

import Select from './Select';

export default class QuerySelect extends React.Component {
  selectInput = ({ name, value, options }) => {
    return (
      <Select
        name={name}
        value={(value && value.code) || ''}
        options={options}
        title={name[0].toUpperCase() + name.slice(1)}
        onChange={e => this.props.change(name, e.target.value)}
      />
    )
  }
  render() {
    const { grade, domain, cluster, standard, component } = this.props;
    return (
      <div className="d-flex flex-column align-items-center bg-light p-1 border">
        <h3>Standard</h3>

        <div className="d-flex">
          <this.selectInput name="grade" value={grade} options={GRADES} />

          {grade &&
            <this.selectInput name="domain" value={domain} options={grade.domains} />}

          {domain &&
            <this.selectInput name="cluster" value={cluster} options={domain.clusters} />}

          {cluster && 
            <this.selectInput name="standard" value={standard} options={cluster.standards} />}

          {standard && standard.components &&
            <this.selectInput name="component" value={component} options={standard.components} />}
        </div>
      </div>
    );
  }
}
