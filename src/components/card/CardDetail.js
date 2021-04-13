function CardDetail(props) {
  return (
    <p className="card-detail">
      <span className="bold">{props.title}</span>
      <span>{props.value}</span>
    </p>
  )
}

export default CardDetail;
