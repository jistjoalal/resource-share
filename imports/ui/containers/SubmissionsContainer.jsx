import { withTracker } from 'meteor/react-meteor-data';

import { currentUser, resources, author } from './data';

import ResourceList from '../components/ResourceList';

const withSubmissions = withTracker(({ match }) => {
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

export default withSubmissions(ResourceList);
