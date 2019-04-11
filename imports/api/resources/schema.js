import SimpleSchema from 'simpl-schema';

export default RESOURCE_SCHEMA = new SimpleSchema({
  title: {
    type: String,
    min: 1,
    max: 40,
  },
  url: {
    label: 'Your link',
    type: String,
    regEx: SimpleSchema.RegEx.Url,
  },
  grade: {
    type: String,
  },
  domain: {
    type: String,
  },
  cluster: {
    type: String,
    optional: true,
  },
  standard: {
    type: String,
    optional: true,
  },
  component: {
    type: String,
    optional: true,
  },
})
