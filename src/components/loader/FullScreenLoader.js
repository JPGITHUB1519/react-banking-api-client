import Loader from "./Loader";
import Proptypes from "prop-types";

function FullScreenLoader(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className="full-screen-black-overlay">
      <div className="full-screen-modal-container">
        <Loader color={props.color} />
      </div>
    </div>
  );
}

FullScreenLoader.propTypes = {
  show: Proptypes.bool
};

FullScreenLoader.defaultProps = {
  color: "red",
  show: true
};

export default FullScreenLoader;
