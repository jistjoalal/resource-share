import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';

import LoadingIcon from '../LoadingIcon';
import FileInput from './FileInput';

class AddResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: '',
      show: false,
      uploading: false,
      isFile: false,
    };
  }
  componentDidMount() {
    Modal.setAppElement('body');  // deals w/ err msg from react-modal
  }
  render() {
    const { err, show, uploading, isFile } = this.state;
    const code = Session.get('query');
    return (
      <span className="my-1">

        <button
          className="btn btn-primary"
          onClick={this.open}
        >
          Submit new Resource
        </button>

        <Modal
          isOpen={show}
          contentLabel="Submit new Resource"
          onRequestClose={this.close}
        >
          <form onSubmit={this.newResource}>

            <h3>
              Submit New <strong>{code}</strong> Resource
            </h3>

            {err &&
              <p className="alert alert-warning">
                {err}
              </p>
            }

            <div className="form-group">
              <label>Title</label>
              <input
                className="form-control"
                type="text"
                ref="title"
                name="title"
                placeholder="Title"
              />
            </div>

            <div className="form-group">
              <p>What are you sharing?</p>
              <button
                className={`btn btn-outline-primary ml-2 ${isFile ? '' : 'active'}`}
                type="button"
                onClick={_ => this.setState({ isFile: false })}
              >
                Link
              </button>
              <button
                className={`btn btn-outline-primary ml-2 ${isFile ? 'active' : ''}`}
                type="button"
                onClick={_ => this.setState({ isFile: true })}
              >
                File
              </button>
            </div>

            {!isFile &&
              <div className="form-group">
                <label>URL</label>
                <input
                  type="text"
                  name="url"
                  className="form-control"
                  placeholder="URL"
                />
              </div>
            }

            {isFile &&
              <FileInput />
            }

            <div className="form-group">

              <button
                className="btn btn-primary m-1"
                type="submit"
              >
                Submit
              </button>
              
              <button
                className="btn btn-outline-danger m-1"
                onClick={this.close}
              >
                Close
              </button>
              
            </div>

            {uploading &&
              <em>uploading...<LoadingIcon /></em>
            }

          </form>
        </Modal>
      </span>
    )
  }
  toggleTypeSelect = e => {
    e.preventDefault();
    const { typeSelect } = this.state;
    const newTypeSelect = typeSelect === 'Link' ? 'File' : 'Link';
    this.setState({ typeSelect: newTypeSelect })
  }
  open = _ => {
    this.setState({ show: true });
  }
  close = _ => {
    this.setState({
      show: false,
      err: '',
      uploading: false,
      typSelect: 'Link',
    });
  }
  newResource = e => {
    e.preventDefault();
    const { url, title, fileUpload } = e.target;
    const file = fileUpload && fileUpload.files[0];

    if (file) {
      this.uploadViaS3(title.value, file);
    }
    else {
      this.insertResource(title.value, url.value);  
    }
  }
  // upload to s3, then insert the s3 url
  uploadViaS3 = (title, file) => {
    if (!title || title.length > 40) {
      return this.setState({
        err: 'Title must be between 1-40 chars.'
      });
    }
    this.setState({ uploading: true });
    const uploader = new Slingshot.Upload("files");
    uploader.send(file, (error, downloadUrl) => {
      if (error) {
        console.log(error);
        // filter verbose errors
        const { reason } = error;
        const err = reason.length > 50 ? 'Upload Failed' : reason;
        this.setState({ err, uploading: false });
      }
      else {
        this.setState({ uploading: false });
        this.insertResource(title, downloadUrl, true);
      }
    });
  }
  insertResource = (title, url, isFile=false) => {
    const { pathname } = this.props.history.location;
    const resource = {
      title,
      url,
      code: pathname.split`/cc/`[1],
    };

    Meteor.call('resources.new', resource, isFile, (err, _id) => {
        if (err) {
          this.setState({ err: err.reason });
        }
        else {
          this.props.history.push(`/comments/${_id}`)
          Session.set('message', 'Post Created!');
          Session.set('query', '');
        }
      }
    );
  }
}

export default withRouter(AddResource);
