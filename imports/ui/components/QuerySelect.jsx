import React from 'react';

import Standards from '../../api/standards';

import Select from './Select';

export default class QuerySelect extends React.Component {
  handleChange = key => e => {
    this.props.change(key, e.target.value);
  }
  render() {
    const { grade, domain, cluster, standard, component, change, removeKey } = this.props;
    return (
      <div>
        <h3>Standard</h3>

        <div className="d-flex">
          <Select name="grade" title="Grade" value={(grade && grade.code) || ''}
            onChange={this.handleChange('grade')} 
            options={Standards}
            remove={() => removeKey('grade')} />

          {grade &&
            <Select name="domain" title="Domain" value={(domain && domain.code) || ''}
              onChange={this.handleChange('domain')}
              options={grade.domains} 
              remove={() => removeKey('domain')} />}

          {domain &&
            <Select name="cluster" title="Cluster" value={(cluster && cluster.code) || ''}
              onChange={this.handleChange('cluster')} 
              options={domain.clusters} 
              remove={() => removeKey('cluster')} />}

          {cluster && 
            <Select name="standard" title="Standard" value={(standard && standard.code) || ''}
              onChange={this.handleChange('standard')} 
              options={cluster.standards} 
              remove={() => removeKey('standard')} />}

          {standard && standard.components &&
            <Select name="component" title="Component" value={(component && component.code) || ''}
              onChange={this.handleChange('component')} 
              options={standard.components} 
              remove={() => removeKey('component')} />}
        </div>
      </div>
    );
  }
}