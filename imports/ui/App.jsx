import React from 'react';

import Standards from '../api/standards';

import ResourceList from './ResourceList';
import Select from './Select';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: '',
      domain: '',
      cluster: '',
      standard: '',
      component: '',
    };
  }
  render() {

    const { grade, domain, cluster, standard, component } = this.state;
    const query = {};
    if (grade) query.grade = grade.code;
    if (domain) query.domain = domain.code;
    if (cluster) query.cluster = cluster.code;
    if (standard) query.standard = standard.code;
    if (component) query.component = component.code;

    return (
      <div>
        <h1>Resource Share</h1>

        <hr />

        <h3>Standard</h3>

        <div className="d-flex">
          <Select name="grade" title="Grade" value={(grade && grade.code) || ''}
            onChange={this.changeGrade} 
            options={Standards}
            remove={this.removeGrade} />

          {grade &&
            <Select name="domain" title="Domain" value={(domain && domain.code) || ''}
              onChange={this.changeDomain}
              options={grade.domains} 
              remove={this.removeDomain} />}

          {domain &&
            <Select name="cluster" title="Cluster" value={(cluster && cluster.code) || ''}
              onChange={this.changeCluster} 
              options={domain.clusters} 
              remove={this.removeCluster} />}

          {cluster && 
            <Select name="standard" title="Standard" value={(standard && standard.code) || ''}
              onChange={this.changeStandard} 
              options={cluster.standards} 
              remove={this.removeStandard} />}

          {standard && standard.components &&
            <Select name="component" title="Component" value={(component && component.code) || ''}
              onChange={this.changeComponent} 
              options={standard.components} 
              remove={this.removeComponent} />}
        </div>

        <hr />

        <ResourceList query={query} grade={grade}
          domain={domain} cluster={cluster}
          standard={standard} component={component} />
      </div>
    )
  }
  removeGrade = () => {
    this.setState({ grade: '' });
    this.removeDomain();
  }
  removeDomain = () => {
    this.setState({ domain: ''});
    this.removeCluster();
  }
  removeCluster = () => {
    this.setState({ cluster: ''});
    this.removeStandard();
  }
  removeStandard = () => {
    this.setState({ standard: ''});
    this.removeComponent();
  }
  removeComponent = () => this.setState({ component: '' });
  changeComponent = e => {
    const { standard } = this.state;
    const title = e.target.value;
    this.setState({ component: standard.components[title] });
  }
  changeStandard = e => {
    const { cluster } = this.state;
    const title = e.target.value;
    this.setState({ standard: cluster.standards[title] });
    this.removeComponent();
  }
  changeCluster = e => {
    const { domain } = this.state;
    const title = e.target.value;
    this.setState({ cluster: domain.clusters[title] });
    this.removeStandard();
  }
  changeDomain = e => {
    const { grade } = this.state;
    const title = e.target.value;
    this.setState({ domain: grade.domains[title] });
    this.removeCluster();
  }
  changeGrade = e => {
    const title = e.target.value;
    this.setState({ grade: Standards[title] });
    this.removeDomain();
  }
}

export default App;
