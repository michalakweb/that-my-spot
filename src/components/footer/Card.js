import React from "react"

const Card = props => (
  <div
    className="card"
    onClick={() => {
      props.selectCard(props.cardInfo)
    }}
  >
    {props.cardInfo.name}
    {props.cardInfo.value}
  </div>
)

export default Card
