Slingshot.fileRestrictions("files", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
});

Slingshot.createDirective("files", Slingshot.S3Storage, {
  bucket: "ccshare-file",
  region: 'us-west-2',
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
