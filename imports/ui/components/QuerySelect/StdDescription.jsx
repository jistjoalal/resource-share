import React from 'react';

import withDescription from '../../containers/DescriptionContainer';

class StdDescription extends React.Component {
  render() {
    const { text, subject } = this.props;
    return (
      <div>
        <h2 className="StdDescription__code m-2">
          {subject}
        </h2>

        <p className="StdDescription__text m-2">
          {text}
        </p>
      </div>
    );
  }
}

export default withDescription(StdDescription);
