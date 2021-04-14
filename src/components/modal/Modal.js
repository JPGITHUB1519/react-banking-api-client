import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onCloseClick();
  }

  render() {
    if (this.props.show !== undefined && this.props.show === false) {
      return null;
    }

    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="modal-close-button" onClick={this.handleClick}>&times;</span>
            <h2>{this.props.header}</h2>
          </div>
          <div className="modal-body">
            {this.props.children}
            {/* in this case this is not needed because we are passing the jsx directly */}
            {/* <span dangerouslySetInnerHTML={{__html: }} /> */}
          </div>
          <div className="modal-footer">
            <h3>{this.props.footer}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
