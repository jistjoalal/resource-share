import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretAccessKey
});

const s3 = new AWS.S3();

// MIME types allowed for upload to S3
const allowedFileTypes = [
  // images
  "image/png",
  "image/jpeg",
  "image/gif",
  // microsoft office
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/onenote",
  // dev
  "text/plain",
];

Slingshot.fileRestrictions("files", {
  allowedFileTypes,
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
});

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

Meteor.methods({
  /**
   * Delete a file from S3
   * - validation happens in resources.delete
   * @param url: AWS S3 full url as it is saved in DB
   */
  's3.delete'(url) {
    const params = {
      Bucket: process.env.AWSBucket,
      Key: url.split('aws.com/')[1],
    }
    s3.deleteObject(params, (error, data) => {
      if(error) {
        console.log(error);
      } else {
        console.log(data);
      }
    })
  }
})
