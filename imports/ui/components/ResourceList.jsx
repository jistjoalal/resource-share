import React from 'react';

import Resource from './Resource';

export default class ResourceList extends React.Component {
  componentDidMount() {
    Session.set('page', 1);
  }
  render() {
    return (
      <div className="m-2 p-1">
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
    const titleText = title === 'Resources' ? title : `${username}'s ${title}`;
    return <h2 className="Resource--title">{titleText}</h2>
  }
  renderPageMenu() {
    const { limit, total, title } = this.props;
    const amt = limit > total ? total : limit;
    return (
      <div className="d-flex flex-column align-items-center">
        {total > 0 ?  // hacky - depends on resource existing for each standard
          <p>{`${amt}/${total} ${title}`}</p>
        : <p>{`No ${title}`}</p>}

        {limit < total &&
          <a className="btn btn-outline-secondary" onClick={this.nextPage}>More</a>}
      </div>
    )
  }
  renderResources() {
    const { resources, user, loading } = this.props;
    if (!resources) return null;
    return (
      <div className="ResourceList">
        {resources.map(resource =>
          <Resource key={resource._id} resource={resource} user={user} />
        )}
        {loading && <p>Loading...</p>}
      </div>
    );
  }
  renderHeaders() {
    return (
      <div className="Resource row border-bottom">
        <span className="col-2 text-truncate">Score</span>
        <span className="col-7 text-truncate">Resource</span>
        <span className="col-2 text-truncate">User</span>
      </div>
    )
  }
  nextPage = () => {
    const page = Session.get('page'); 
    Session.set('page', page + 1);
  }
}
