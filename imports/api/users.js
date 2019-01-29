// Server
Meteor.publish('userData', function (_id) {
  if (_id) {
    return Meteor.users.find({ _id }, {
      fields: {
        favorites: 1,
        emails: 1,
      }
    });
  } else {
    this.ready();
  }
});
