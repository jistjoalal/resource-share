import SimpleSchema from 'simpl-schema';

export default COMMENT_SCHEMA = new SimpleSchema({
  text: {
    type: String,
    min: 1,
    max: 10000,
  },
  resourceId: {
    type: String,
    min: 1,
  },
  username: {
    type: String,
    min: 1,
  },
  authorId: {
    type: String,
    min: 1,
  },
  createdAt: {
    type: Date,
  },
});
