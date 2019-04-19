import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter, Link } from 'react-router-dom';

import LoadingIcon from '../LoadingIcon';
import FileInput from './FileInput';
import Modal from './Modal';

class AddResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: '',
      uploading: false,
      isFile: false,
    };
  }
  render() {
    const { err, uploading, isFile } = this.state;
    const code = Session.get('query');
    return (
      <Modal buttonText={'Submit new Resource'}>

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
            
          </div>

          {uploading &&
            <em>uploading...<LoadingIcon /></em>
          }

        </form>
      </Modal>
    )
  }
  toggleTypeSelect = e => {
    e.preventDefault();
    const { typeSelect } = this.state;
    const newTypeSelect = typeSelect === 'Link' ? 'File' : 'Link';
    this.setState({ typeSelect: newTypeSelect })
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
    if (!title || title.length > 200) {
      return this.setState({
        err: 'Title must be between 1-200 chars.'
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

    Meteor.call('resources.new', resource, isFile, (error, _id) => {
      if (error) {
        this.setState({ err: parseErr(error) });
      }
      else {
        this.props.history.push(`/comments/${_id}`)
        Session.set('message', 'Post Created!');
        Session.set('query', '');
      }
    });
  }
}

const parseErr = error => {
  let err = error.reason;
  if (err.includes('Resource already exists.')) {
    const _id = err.split`.`[1];
    err = (
      <span>
        Resource already exists
        <Link to={`/comments/${_id}`} target="_blank"> Here</Link>
      </span>
    )
  }
  return err;
}

export default withRouter(AddResource);
