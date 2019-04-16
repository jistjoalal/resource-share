import './methods';
import './allowed.filetypes';

const { AWSBucket, AWSRegion, AWSAccessKeyId, AWSSecretAccessKey } = process.env;

if (!AWSBucket) throw new Meteor.Error('AWSBucket not set');
if (!AWSRegion) throw new Meteor.Error('AWSRegion not set');
if (!AWSAccessKeyId) throw new Meteor.Error('AWSAccessKeyId not set');
if (!AWSSecretAccessKey) throw new Meteor.Error('AWSSecretAccessKey not set');

Slingshot.createDirective("files", Slingshot.S3Storage, {
  bucket: AWSBucket,
  region: AWSRegion,
  AWSAccessKeyId: AWSAccessKeyId,
  AWSSecretAccessKey: AWSSecretAccessKey,

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
