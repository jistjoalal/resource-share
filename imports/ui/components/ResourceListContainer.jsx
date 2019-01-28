import React from 'react';

import ResourceList from './ResourceList';

export default class ResourceListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
  }
  render() {
    return (
      <div>
        <h3>Resources</h3>

        <ResourceList query={this.props.query} page={this.state.page} />
        <button onClick={this.changePage(1)}>More</button>
      </div>
    );
  }
  changePage = inc => () => this.setState({ 
    page: this.state.page + inc,
  });
} 
