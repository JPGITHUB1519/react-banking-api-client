import React from "react";

class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onCloseClick();
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    console.log(this.props.children);
    return (   
      <div className={`alert alert--${this.props.type}`}>
          {/* {this.props.children} */}
          <span dangerouslySetInnerHTML={{__html: this.props.children}}></span>
          <button className="alert__close" onClick={this.handleClick}>
          <span>&times;</span>
        </button>
      </div>
    );
  }
}

Alert.defaultProps = {
  type: 'primary'
}

export default Alert;
