import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import 'bootstrap/dist/js/bootstrap.bundle.min';

import '../imports/config/simple-schema-config';

import Routes from '../imports/Routes';

Meteor.startup(() => {
  render(<Routes />, document.getElementById('react-target'));
});
