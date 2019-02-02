import React from 'react';
import FlipMove from 'react-flip-move';

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
    return comments.map(comment =>
      <div key={comment._id} className="row">
        <div className="col border d-flex justify-content-between rounded m-1 bg-light">
          <p className="p-2 mb-0">{comment.text}</p>
          {comment.authorId === Meteor.userId() ?
            <button className="btn" onClick={() => this.delete(comment._id)}>
              <i className="fa fa-trash-alt"></i> 
            </button>
          : <p className="text-muted p-2 mb-0">{comment.username}</p>}
        </div> 
      </div>
    );
  }
  delete = _id => {
    Meteor.call('comments.delete', _id);
  }
}
