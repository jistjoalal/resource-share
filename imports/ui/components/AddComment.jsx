import React from 'react';

export default class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: '',
    };
  }
  render() {
    const { err } = this.state;
    return (
      <div className="row">
        <div className="col border shadow-sm">
          <form onSubmit={this.submit}>
            {err &&
              <div className="form-group mt-2">
                <p className="alert alert-warning">{err}</p>
              </div>}
            <div className="form-group mt-2">
              <h3>Add Comment</h3>
            </div>
            <div className="form-group">
              <textarea className="form-control" name="text" rows={3} />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">Add Comment</button> 
            </div>
          </form>
        </div>
      </div>
    );
  }
  submit = e => {
    e.preventDefault();
    const { resource } = this.props;
    const text = e.target.text.value;
    Meteor.call('comments.add', text, resource._id, (err, res) => {
      if (err) return this.setState({ err: err.reason });
    });
  }
}
