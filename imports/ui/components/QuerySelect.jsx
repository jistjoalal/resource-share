import React from 'react';

import Standards from '../../api/standards';

import Select from './Select';

export default class QuerySelect extends React.Component {
  render() {
    const { grade, domain, cluster, standard, component, change, removeKey } = this.props;
    return (
      <div>
        <h3>Standard</h3>

        <div className="d-flex">
          <Select name="grade" title="Grade" value={(grade && grade.code) || ''}
            onChange={change('grade', Standards)} 
            options={Standards}
            remove={() => removeKey('grade')} />

          {grade &&
            <Select name="domain" title="Domain" value={(domain && domain.code) || ''}
              onChange={change('domain', grade.domains)}
              options={grade.domains} 
              remove={() => removeKey('domain')} />}

          {domain &&
            <Select name="cluster" title="Cluster" value={(cluster && cluster.code) || ''}
              onChange={change('cluster', domain.clusters)} 
              options={domain.clusters} 
              remove={() => removeKey('cluster')} />}

          {cluster && 
            <Select name="standard" title="Standard" value={(standard && standard.code) || ''}
              onChange={change('standard', cluster.standards)} 
              options={cluster.standards} 
              remove={() => removeKey('standard')} />}

          {standard && standard.components &&
            <Select name="component" title="Component" value={(component && component.code) || ''}
              onChange={change('component', standard.components)} 
              options={standard.components} 
              remove={() => removeKey('component')} />}
        </div>
      </div>
    );
  }
}