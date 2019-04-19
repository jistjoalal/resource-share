import React from 'react';

export default class FileInput extends React.Component {
  constructor() {
    super();
    this.state = {
      fileName: '',
    };
  }
  render() {
    const { fileName } = this.state;
    return (
      <div className="form-group">
        <p>File</p>
        <div className="custom-file">
          <input
            type="file"
            name="fileUpload"
            className="custom-file-input"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
            onChange={this.handleChange}
          />
          <label
            className="custom-file-label"
            htmlFor="inputGroupFile01"
          >
            { fileName || 'Choose file' }
          </label>
        </div>
      </div>
    )
  }
  handleChange = e => {
    const file = e.target.files[0];
    this.setState({ fileName: file ? file.name : '' });
  }
}