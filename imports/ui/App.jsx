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
        <h1>K Resource Share</h1>

        <div className="d-flex">
          <Select name="grade" title="Grade" value={(grade && grade.code) || ''}
            onChange={this.changeGrade} 
            options={Standards} />

          {grade &&
            <Select name="domain" title="Domain" value={(domain && domain.code) || ''}
              onChange={this.changeDomain}
              options={grade.domains} />}

          {domain &&
            <Select name="cluster" title="Cluster" value={(cluster && cluster.code) || ''}
              onChange={this.changeCluster} 
              options={domain.clusters} />}

          {cluster && 
            <Select name="standard" title="Standard" value={(standard && standard.code) || ''}
              onChange={this.changeStandard} 
              options={cluster.standards} />}

          {standard && standard.components &&
            <Select name="component" title="Component" value={(component && component.code) || ''}
              onChange={this.changeComponent} 
              options={standard.components} />}
        </div>

        <ResourceList query={query} grade={grade}
          domain={domain} cluster={cluster}
          standard={standard} component={component} />
      </div>
    )
  }
  changeComponent = e => {
    const { standard } = this.state;
    const title = e.target.value;
    this.setState({ component: standard.components[title] });
  }
  changeStandard = e => {
    const { cluster } = this.state;
    const title = e.target.value;
    this.setState({
      standard: cluster.standards[title],
      component: '',
    });
  }
  changeCluster = e => {
    const { domain } = this.state;
    const title = e.target.value;
    this.setState({
      cluster: domain.clusters[title],
      standard: '',
      component: '',
    });
  }
  changeDomain = e => {
    const { grade } = this.state;
    const title = e.target.value;
    this.setState({
      domain: grade.domains[title],
      cluster: '',
      standard: '',
      component: '',
    });
  }
  changeGrade = e => {
    const title = e.target.value;
    this.setState({
      grade: Standards[title],
      domain: '',
      cluster: '',
      standard: '',
      component: '',
    });
  }
}

export default App;
