import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Descriptions from '../../api/descriptions';

export default withDescription = withTracker(({ code }) => {
  
  const query = { code: { $eq: code } };
  Meteor.subscribe('descriptions', query);
  const description = Descriptions.findOne({});
  const title = description && description.title
  const desc = description && description.desc;
  const useTitle = title && /[a-z]/.test(title) && title.length > 1;
  const text = useTitle ? title : desc;
  return {
    text,
  }
})
