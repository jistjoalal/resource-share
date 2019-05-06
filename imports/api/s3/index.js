import './methods';
import './allowed.filetypes';

const envVar = key => {
  const val = process.env[key] 
  if (!val) throw new Meteor.Error(`${key} not set`);
  return val;
}

Slingshot.createDirective("files", Slingshot.S3Storage, {
  bucket: envVar('AWSBucket'),
  region: envVar('AWSRegion'),
  AWSAccessKeyId: envVar('AWSAccessKeyId'),
  AWSSecretAccessKey: envVar('AWSSecretAccessKey'),

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
