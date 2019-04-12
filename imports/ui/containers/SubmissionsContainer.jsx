import { withTracker } from 'meteor/react-meteor-data';

import { currentUser, resources, author } from './data';

export default withSubmissions = withTracker(({ match }) => {
  // resources favorited by user specified in route
  const { userId } = match.params;
  const query = { authorId: userId };

  return {
    title: 'Submissions',
    ...currentUser(),
    ...resources(query),
    ...author(userId),
  };
});
