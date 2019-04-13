import { Meteor } from 'meteor/meteor';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretAccessKey
});

const s3 = new AWS.S3();

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
        // console.log(data);
      }
    })
  }
});
