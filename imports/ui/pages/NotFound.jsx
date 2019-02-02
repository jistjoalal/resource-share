import React from 'react';
import { withRouter } from 'react-router-dom';

import CmdBox from '../components/CmdBox';

class NotFound extends React.Component {
  render() {
    return (
      <div className="container w-75 mx-auto my-4 shadow-sm border bg-light p-3 rounded">
        <h1 className="border-bottom mb-4">🛠 Page not found</h1>
        <CmdBox />
      </div>
    );
  }
}

export default withRouter(NotFound);
