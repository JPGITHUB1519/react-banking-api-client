import React from 'react';
import PropTypes from 'prop-types';

function ButtonPrimary(props) {
  return (
    <button className={`button button--red button--size-medium button--spacing-${props.spacing}`} onClick={props.onClick}>
      {props.title}
    </button>
  );
}

ButtonPrimary.propTypes = {
  onClick: PropTypes.func,
  spacing: PropTypes.string,
  title: PropTypes.string
};

ButtonPrimary.defaultProps = {
  title: 'Button',
  spacing: 'small'
};

export default ButtonPrimary;
