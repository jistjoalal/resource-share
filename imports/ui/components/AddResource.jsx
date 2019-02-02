import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';

class AddResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: '',
      show: false,
    };
  }
  componentDidMount() {
    Modal.setAppElement('body');  // deals w/ err msg from react-modal
  }
  open = () => {
    this.setState({ show: true });
  }
  close = () => {
    this.setState({ show: false, err: '' });
  }
  render() {
    const { err, show } = this.state;
    const code = Object.values(Session.get('query') || {}).join('.');
    return (
      <span className="my-1">
        <button className="btn btn-primary" onClick={this.open}>Submit new Resource</button>

        <Modal
          isOpen={show}
          contentLabel="Submit new Resource"
          onRequestClose={this.close}
        >
          <form className="form-group" onSubmit={this.newResource}>
            <h3>Submit New <strong>{code}</strong> Resource</h3>

            {err && <p className="alert alert-warning">{err}</p>}

            <div className="form-group">
              <label>Title</label>
              <input type="text" ref="title" name="title" className="form-control" placeholder="Title" />
            </div>
            
            <div className="form-group">
              <label>URL</label>
              <input type="text" name="url" className="form-control" placeholder="URL" />
            </div>

            <div className="form-group">
              <button className="btn btn-primary m-1" type="submit">Submit</button>
              <button className="btn btn-outline-danger m-1" onClick={this.close}>Close</button>
            </div>
          </form>
        </Modal>
      </span>
    )
  }
  newResource = e => {
    e.preventDefault();
    const { pathname } = this.props.history.location;
    const [ grade, domain, cluster, standard, component ] = 
      pathname.split('/cc/')[1].split('.');
    const { url, title} = e.target;

    // db
    Meteor.call('resources.new',
      title.value,
      url.value,
      grade,
      domain || '',
      cluster || '',
      standard || '',
      component || '',
      (err, res) => {
        if (err) {
          this.setState({ err: err.reason });
        }
        else {
          // reset form
          url.value = '';
          title.value = '';
          this.close();
        }
      }
    ); 
  }
}

export default withRouter(AddResource);
