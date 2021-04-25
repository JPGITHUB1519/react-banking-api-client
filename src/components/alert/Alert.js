import React from "react";
import PropTypes from 'prop-types';

// Alert can render in two ways: receive HTML as prop or react elements as children
class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onCloseClick();
  }

  render() {
    if (this.props.show !== undefined && this.props.show === false) {
      return null;
    }
    
    return (   
      <div className={`alert alert--${this.props.type}`}>
          {this.props.children}
          {this.props.html &&  <span dangerouslySetInnerHTML={{__html: this.props.html}} /> }
          <button className="alert__close" onClick={this.handleClick}>
          <span>&times;</span>
        </button>
      </div>
    );
  }
}

Alert.propTypes = {
  children: PropTypes.node,
  onCloseClick: PropTypes.func,
  show: PropTypes.bool,
  type: PropTypes.string
}

Alert.defaultProps = {
  type: 'primary'
}

export default Alert;
