import "./loader.css";
import Proptypes from "prop-types";

export default function Loader(props) {
  if (!props.show) {
    return null;
  }

  let loader;

  if (!props.customOptions) {
    loader = <div className={`loader loader--color-${props.color}`} />;
  } else {
    const styles = {};

    if (props.customOptions.base) {
      styles["borderColor"] = props.customOptions.base;
    }

    if (props.customOptions.border) {
      styles["borderTopColor"] = props.customOptions.border;
    }

    if (props.customOptions.width) {
      styles["width"] = props.customOptions.width;
    }

    if (props.customOptions.height) {
      styles["height"] = props.customOptions.height;
    }

    loader = <div className="loader" style={styles} />;
  }

  return loader;
}

Loader.propTypes = {
  color: Proptypes.string,
  show: Proptypes.bool,
  customOptions: Proptypes.shape({
    base: Proptypes.string,
    border: Proptypes.string,
    width: Proptypes.number,
    height: Proptypes.number
  })
};

Loader.defaultProps = {
  color: "red",
  show: true
};
