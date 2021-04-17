import React from 'react';
import PropTypes from 'prop-types';

function ButtonBackground(props) {
  return (
    <button className={`button button--${props.type}-bg button--size-small`} onClick={props.onClick}></button>
  );
}

ButtonBackground.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string
};

export default ButtonBackground;
