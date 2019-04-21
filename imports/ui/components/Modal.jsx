import React from 'react';
import ReactModal from 'react-modal';

export default class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }
  componentDidMount() {
    ReactModal.setAppElement('body');  // deals w/ err msg from react-modal
  }
  render() {
    const { show } = this.state;
    const { children, buttonText } = this.props;
    return (
      <span className="my-1">

        <button
          className="btn btn-primary"
          onClick={this.open}
        >
          {buttonText}
        </button>

        <ReactModal
          isOpen={show}
          contentLabel="Submit new Resource"
          onRequestClose={this.close}
        >
          <div className="Modal__close">
            <button
              className="Modal__closeButton"
              onClick={this.close}
            >
              X
            </button>
          </div>
          
          {children} 

        </ReactModal>
      </span>
    );
  }
  open = _ => {
    this.setState({ show: true });
  }
  close = _ => {
    this.setState({
      show: false,
    });
  }
}
