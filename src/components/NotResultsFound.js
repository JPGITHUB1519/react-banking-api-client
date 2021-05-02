import Proptypes from 'prop-types';

function NotResultsFound(props) {
  return (
    <p className="no-results-paragraph">{props.message}</p>
  );
}

NotResultsFound.propTypes = {
  message: Proptypes.string
};

NotResultsFound.defaultProps = {
  message: "No results have been found."
}

export default NotResultsFound;
