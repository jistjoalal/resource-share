import React from 'react';

import Resource from './Resource';

export default class ResourceList extends React.Component {
  componentDidMount() {
    Session.set('page', 1);
  }
  render() {
    return (
      <div>
        {this.renderTitle()}
        {this.renderHeaders()}
        {this.renderResources()}
        {this.renderPageMenu()}
      </div>
    );
  }
  renderTitle() {
    const { user, title } = this.props;
    if (!user) return <h1>Resources</h1>;

    const username = user.emails[0].address;
    if (title === 'Resources') return <h1>{title}</h1>
    return <h1>{`${username}'s ${title}`}</h1>
  }
  renderPageMenu() {
    const { limit, total, title } = this.props;
    const amt = limit > total ? total : limit;
    return (
      <div>
        {total > 0 ?  // hacky - depends on resource existing for each standard
          <p>{`${amt}/${total} ${title}`}</p>
        : <p>{`No ${title}`}</p>}

        {limit < total &&
          <button onClick={this.nextPage}>More</button>}
      </div>
    )
  }
  renderResources() {
    const { resources, user, loading } = this.props;
    if (!resources) return null;
    return (
      <div>
        {resources.map(resource =>
          <Resource key={resource._id} resource={resource} user={user} />
        )}
        {loading && <p>Loading...</p>}
      </div>
    );
  }
  renderHeaders() {
    return (
      <div className="row border-bottom">
        <span className="col-2 text-truncate">Score</span>
        <span className="col-8 text-truncate">Resource</span>
        <span className="col text-truncate">User</span>
      </div>
    )
  }
  nextPage = () => {
    const page = Session.get('page'); 
    Session.set('page', page + 1);
  }
}
