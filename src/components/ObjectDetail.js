import PropTypes from 'prop-types';

function ObjectDetail(props) {
  return (
    <p className="object-detail">
      <span className="bold">{props.title}: </span>
      <span>{props.value}</span>
    </p>
  )
}

ObjectDetail.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default ObjectDetail;
