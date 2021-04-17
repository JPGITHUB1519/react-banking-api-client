import PropTypes from 'prop-types';

function ButtonContainer(props) {
  return (
    <div className="button-container">
      {props.children}
    </div>
  );
}

ButtonContainer.propTypes = {
  children: PropTypes.node
};

export default ButtonContainer;
