import React from 'react';

import withDescription from '../../containers/DescriptionContainer';

class StdDescription extends React.Component {
  render() {
    const { code, tooltip } = this.props;
    console.log(tooltip)
    return (
      <h2
        className="border m-2 p-2"
        data-toggle="tooltip"
        data-html={true}
        title={tooltip}
      >
        {code}
      </h2>
    );
  }
}

export default withDescription(StdDescription);
