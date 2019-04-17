import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class AlertMessage extends React.Component {
  render() {
    const { message } = this.props;
    if (!message) return null;
    return (
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <span>{message}</span>

        <button
          type="button"
          className="close"
          onClick={this.clearMessage}
        >
          <span aria-hidden="true">
            &times;
          </span>
        </button>

      </div>
    );
  }
  clearMessage = () => {
    Session.set('message', '');
  }
}

export default container = withTracker(_ => {
  const message = Session.get('message');
  return { message };
})(AlertMessage);
