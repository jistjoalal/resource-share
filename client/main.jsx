import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App'

import '../imports/config/simple-schema-config';
import 'bootstrap/dist/js/bootstrap.bundle.min';

Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'));
});
