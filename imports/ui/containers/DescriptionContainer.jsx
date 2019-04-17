import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Descriptions from '../../api/descriptions';

export default withDescription = withTracker(({ code }) => {
  
  const query = { code: { $eq: code } };
  Meteor.subscribe('descriptions', query);
  const description = Descriptions.findOne({});
  const title = description && description.title
  const desc = description && description.desc;
  // swap title for description in the case that it's just a code
  const useTitle = title && /[a-z]/.test(title) && title.length > 1;
  const descText = useTitle ? title : desc;
  // swap text for subject when empty (on subject page)
  const subject = code && code.replace('/', '');
  const text = descText || subject;
  return {
    text,
  }
})
