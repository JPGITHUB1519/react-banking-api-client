import PropTypes from 'prop-types';

function CardList(props) {
  return (
    <div className="card-container">
      {props.children}
    </div>
  );
}

CardList.propTypes = {
  children: PropTypes.node
};

export default CardList;
