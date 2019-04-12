import { withTracker } from 'meteor/react-meteor-data';

import { currentUser, resources, author } from './data';

import ResourceList from '../components/ResourceList';

const withFavorites = withTracker(({ match }) => {
  // resources favorited by user specified in route
  const { userId } = match.params;
  const query = { favoritedBy: { $elemMatch: { $eq: userId } } };

  return {
    title: 'Favorites', 
    ...currentUser(),
    ...resources(query),
    ...author(userId)
  };
});

export default withFavorites(ResourceList);
