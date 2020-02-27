import React from "react"

const Card = props => (
  <div
    className={`card card${props.stylePosition}`}
    onClick={() => {
      props.selectCard(props.cardInfo, props.position)
    }}
  >
    <div className="card_header">
      <p>{props.cardInfo.value}</p>
    </div>
    <div className="card_body">{props.cardInfo.name}</div>
  </div>
)

export default Card
