import PropTypes from 'prop-types';

function CardDetail(props) {
  return (
    <p className="card-detail">
      <span className="bold">{props.title}</span>
      <span>{props.value}</span>
    </p>
  )
}

CardDetail.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default CardDetail;
