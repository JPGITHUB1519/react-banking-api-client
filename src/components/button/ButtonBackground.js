import React from 'react';

function ButtonBackground(props) {
  return (
    <button className={`button button--${props.type}-bg button--size-small`} onClick={props.onClick}></button>
  );
}
    
export default ButtonBackground;
