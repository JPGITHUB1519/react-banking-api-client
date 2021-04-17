import React from "react";
import PropTypes from 'prop-types';

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
          {/* {this.props.children} */}
          <span dangerouslySetInnerHTML={{__html: this.props.children}} />
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
