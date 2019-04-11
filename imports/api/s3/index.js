import './methods';
import './allowed.filetypes';

Slingshot.createDirective("files", Slingshot.S3Storage, {
  bucket: process.env.AWSBucket,
  region: process.env.AWSRegion,
  AWSAccessKeyId: process.env.AWSAccessKeyId,
  AWSSecretAccessKey: process.env.AWSSecretAccessKey,

  acl: "public-read",

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      const message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    //Store file into a directory by the user's username.
    const user = Meteor.users.findOne(this.userId);
    return user._id + "/" + file.name;
  }
});
