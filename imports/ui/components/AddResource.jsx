import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';

import LoadingIcon from './LoadingIcon';

class AddResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: '',
      show: false,
      uploading: false,
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
    const { err, show, uploading } = this.state;
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
              <input type="file" name="fileUpload" />
            </div>

            <div className="form-group">
              <button className="btn btn-primary m-1" type="submit">Submit</button>
              <button className="btn btn-outline-danger m-1" onClick={this.close}>Close</button>
            </div>

            {uploading && <em>uploading...<LoadingIcon /></em>}
          </form>
        </Modal>
      </span>
    )
  }
  newResource = e => {
    e.preventDefault();
    const { url, title, fileUpload } = e.target;
    const file = fileUpload.files[0];

    if (file) {
      this.uploadViaS3(title.value, file);
    }
    else {
      this.insertResource(title.value, url.value);  
    }
  }
  // upload to s3, then insert the s3 url
  uploadViaS3 = (title, file) => {
    this.setState({ uploading: true });
    const uploader = new Slingshot.Upload("files");
    uploader.send(file, (error, downloadUrl) => {
      if (error) {
        console.error('Error uploading', uploader.xhr.response);
        alert(error);
      }
      else {
        this.setState({ uploading: false });
        this.insertResource(title, downloadUrl);
      }
    });
  }
  insertResource = (title, url) => {
    const { pathname } = this.props.history.location;
    const [ grade, domain, cluster, standard, component ] = 
      pathname.split('/cc/')[1].split('.');

    Meteor.call('resources.new',
      title,
      url,
      grade,
      domain || '',
      cluster || '',
      standard || '',
      component || '',
      (err, _id) => {
        if (err) {
          this.setState({ err: err.reason });
        }
        else {
          this.props.history.push(`/comments/${_id}`)
          Session.set('message', 'Post Created!');
          Session.set('query', {});
        }
      }
    );
  }
}

export default withRouter(AddResource);
