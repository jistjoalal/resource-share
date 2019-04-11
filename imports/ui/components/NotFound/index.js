import React from 'react';

import CmdBox from './CmdBox';

export default class NotFound extends React.Component {
  render() {
    return (
      <div className="container w-75 mx-auto my-4 shadow-sm border bg-light p-3 rounded">
        <h1 className="border-bottom mb-4">🛠 Page not found</h1>
        <CmdBox />
      </div>
    );
  }
}
