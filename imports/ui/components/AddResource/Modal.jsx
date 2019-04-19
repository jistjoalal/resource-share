/**
 * Modal
 * - modal display for use in component composition
 * - includes open and close buttons
 * 
 * @prop {String} buttonText Text for open button
 */
import React from 'react';
import ReactModal from 'react-modal';

export default class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    }
  }
  componentDidMount() {
    ReactModal.setAppElement('body');  // deals w/ err msg from react-modal
  }
  render() {
    const { children, buttonText } = this.props;
    const { show } = this.state;
    return (
      <span className="my-1">

        <button
          className="btn btn-primary"
          onClick={this.open}
        >
          {buttonText || 'Open'}
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
              &times;
            </button> 
          </div>

          {children}
          
        </ReactModal>

      </span>
    )
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
