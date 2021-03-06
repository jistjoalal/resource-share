import SimpleSchema from 'simpl-schema';

export default RESOURCE_SCHEMA = new SimpleSchema({
  title: {
    type: String,
    min: 1,
    max: 200,
  },
  url: {
    label: 'Your link',
    type: String,
    regEx: SimpleSchema.RegEx.Url,
  },
  code: {
    type: String,
    min: 1,
  },
});
