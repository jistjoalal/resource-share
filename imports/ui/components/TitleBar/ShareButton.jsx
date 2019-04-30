import React from 'react';
import { FaShareAlt } from 'react-icons/fa';

export default class ShareButton extends React.Component {
  render() {
    return (
      navigator.share !== undefined &&
        <button
          className="btn btn-info"
          onClick={this.share}
        >
          Share <FaShareAlt />
        </button>
    );
  }
  share = _ => {
    if (navigator.share) {
      navigator.share({
          title: 'CCShare',
          text: 'Check out CCShare for Common Core Resources',
          url: 'https://ccshare.herokuapp.com/',
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    }
  }
}
