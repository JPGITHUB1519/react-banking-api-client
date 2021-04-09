function PrimaryButton(props) {
  return <button className="button button--red button--size-medium button--spacing-small" onClick={props.onClick}>
          {props.title}
        </button>
}

export default PrimaryButton;
