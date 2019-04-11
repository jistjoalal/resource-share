import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import COMMENT_SCHEMA from './schema';
import { notAuthErr } from '../helpers';

Meteor.methods({ 
  'comments.add'(text, resourceId) {
    if (!this.userId) throw notAuthErr;

    const authorId = this.userId;
    const username = Meteor.users.findOne({ _id: authorId }).emails[0].address;
    const createdAt = new Date();

    COMMENT_SCHEMA.validate({ text, resourceId, username, authorId, createdAt });

    Comments.insert({
      text,
      resourceId,
      username,
      authorId,
      createdAt,
    });
  },
  'comments.delete'(_id) {
    if (!this.userId) throw notAuthErr;

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
    }).validate({ _id });

    Comments.remove({ _id, authorId: this.userId });
  }
});
