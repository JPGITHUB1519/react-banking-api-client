import PropTypes from 'prop-types';

function Card(props) {
  return (
    <div className="card">
      {props.children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node
};

export default Card;
