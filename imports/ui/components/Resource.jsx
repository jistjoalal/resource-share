import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class Resource extends React.Component {
  componentDidMount() {
    Meteor.subscribe('userData');
  }
  render() {
    const { resource } = this.props
    return (
      <div className="row border-bottom">
        <span className="col-2 text-danger text-truncate">
          <span>{resource.score}</span>
        </span>

        <span className="col-8 text-truncate">
          { !!Meteor.userId() &&
            <button onClick={this.favorite}>&lt;3</button>}

          <a href={resource.url} className="text-truncate">
            {resource.title}
          </a>
        </span>


        <span className="col text-secondary text-truncate">{resource.username}</span>
      </div>
    )
  }
  favorite = () => {
    const { _id } = this.props.resource;
    Meteor.subscribe('userData');
    Meteor.call('resources.upvote', _id);
  }
}
