import React from 'react';

import withDescription from '../../containers/DescriptionContainer';

class StdDescription extends React.Component {
  render() {
    const { text } = this.props;
    return (
      <div className="m-2">
        {text}
      </div>
    );
  }
}

export default withDescription(StdDescription);
