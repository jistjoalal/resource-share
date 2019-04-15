import React from 'react';
import { Helmet } from 'react-helmet';

import Resource from './Resource';
import LoadingIcon from '../LoadingIcon';

export default class ResourceList extends React.Component {
  componentDidMount() {
    Session.set('page', 1);
    Session.set('query', '');
  }
  render() {
    return (
      <div className="container border shadow-sm">
        {this.renderTitle()}
        {this.renderResources()}
        {this.renderPageMenu()}
      </div>
    );
  }
  renderTitle() {
    const { title, author } = this.props;
    if (title === 'Resources') return null;

    const titleText = `${author}'s ${title}`;
    return <>
      <Helmet>
        <title>{titleText}</title>
      </Helmet>
      <h2 className="p-2">{titleText}</h2>
    </>
  }
  renderPageMenu() {
    const { limit, total, title } = this.props;
    const amt = limit > total ? total : limit;
    return (
      <div className="d-flex flex-column align-items-center justify-contenter-center">

        {total > 0 ?  // hacky - depends on resource existing for each standard
          <div>{`${amt}/${total} ${title}`}</div>
        : <p>{`No ${title}`}</p>
        }

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
        {loading &&
          <div className="text-center p-2">
            <LoadingIcon />
          </div>
        }
      </>
    );
  }
  nextPage = () => {
    const page = Session.get('page'); 
    Session.set('page', page + 1);
  }
}
