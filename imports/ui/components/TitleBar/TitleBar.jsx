import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Modal from '../Modal';
import AddResource from '../AddResource';
import InstallButton from './InstallButton';
import ToggleButton from './ToggleButton';
import { NavLink } from './Nav';
import AlertMessage from './AlertMessage';
import LoggedOutLinks from './LoggedOutLinks';
import LoggedInLinks from './LoggedInLinks';

class TitleBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: true,
    };
  }
  render() {
    const { title, userId, query } = this.props;
    const { showMessage } = this.state;
    const showAddResource = !!userId && query;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">

          <NavLink to="/">
            <span className="navbar-brand text-white">
              {title}
            </span>
          </NavLink>
          
          <InstallButton />

          <ToggleButton />

          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav flex-grow-1">

              { !userId &&
                <LoggedOutLinks />
              }

              { !!userId &&
                <LoggedInLinks userId={userId} />
              }

            </ul>

            { showAddResource &&
              <Modal buttonText="Submit new Resource">
                <AddResource />
              </Modal>
            }

          </div>

        </nav>

        {showMessage && 
          <AlertMessage /> 
        }

      </div>
    );
  }
  // bootstrap + react is stupid
  // the way bootstrap closes the alert w/ jquery doesnt allow for it to be re-rendered
  // in the same session. (user logs in twice in same session)
  // the cmpWllRcvPrps is what bootstrap should have done
  // close is what the JS-enabled BS alert did, before I had to remove it.
  componentWillReceiveProps() {
    this.setState({ showMessage: true });
  }
}

export default container = withTracker(() => {
  const query = Session.get('query');
  const userId = Meteor.userId();
  return { query, userId };
})(TitleBar);
