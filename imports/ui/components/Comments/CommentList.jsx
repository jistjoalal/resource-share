import React from 'react';
import FlipMove from 'react-flip-move';
import { FaTrashAlt } from 'react-icons/fa';
import moment from 'moment';

export default class CommentList extends React.Component {
  render() {
    return (
      <FlipMove maintainContainerHeight={true}>
        {this.renderComments()}
      </FlipMove>
    );
  }
  renderComments() {
    const { comments } = this.props;
    return comments.map(comment => {
      const time = moment(comment.createdAt).fromNow();
      return (
        <div key={comment._id} className="row">
          <div className="col border d-flex justify-content-between rounded m-1 bg-light">

            <p className="p-2 mb-0">{comment.text}</p>

            {comment.authorId === Meteor.userId() ?
              <div className="d-flex align-items-center">

                <span className="text-muted p-2 mb-0">
                  <b>Me</b> - {time}
                </span>

                <button
                  className="btn"
                  onClick={() => this.delete(comment._id)}
                >
                  <FaTrashAlt />
                </button>

              </div>
            : <span className="text-muted p-2 mb-0">
                {comment.username} - {time}
              </span>
            }
          </div> 
        </div>
      )
    });
  }
  delete = _id => {
    Meteor.call('comments.delete', _id);
  }
}
