import React from 'react';

import Resource from './Resource';
import NotFound from '../pages/NotFound';

export default class ResourceList extends React.Component {
  componentDidMount() {
    Session.set('page', 1);
    Session.set('query', {});
  }
  render() {
    const { user, title } = this.props;
    if (!user && title !== 'Resources') return <NotFound />
    return (
      <div className="container border shadow-sm">
        {this.renderTitle()}
        {this.renderResources()}
        {this.renderPageMenu()}
      </div>
    );
  }
  renderTitle() {
    const { user, title } = this.props;
    if (title === 'Resources') return null;

    const username = user.emails[0].address;
    const titleText = title === 'Resources' ? title : `${username}'s ${title}`;
    return <h2 className="p-2">{titleText}</h2>
  }
  renderPageMenu() {
    const { limit, total, title } = this.props;
    const amt = limit > total ? total : limit;
    return (
      <div className="d-flex flex-column align-items-center justify-contenter-center">
        {total > 0 ?  // hacky - depends on resource existing for each standard
          <div>{`${amt}/${total} ${title}`}</div>
        : <p>{`No ${title}`}</p>}

        <div>
          {limit < total &&
            <a
              className="btn btn-outline-secondary"
              onClick={this.nextPage}
            >
              More
            </a>
          }
          
          { total > 20 &&
            <a
              className="btn btn-outline-secondary mr-2"
              onClick={_ => window.scrollTo(0, 0)}
            >
              Top
            </a>
          }
        </div>
        
      </div>
    )
  }
  renderResources() {
    const { resources, user, loading } = this.props;
    if (!resources) return null;
    return (
      <>
        {resources.map(resource =>
          <Resource key={resource._id} resource={resource} user={user} />
        )}
        {loading && <p>Loading...</p>}
      </>
    );
  }
  nextPage = () => {
    const page = Session.get('page'); 
    Session.set('page', page + 1);
  }
}
