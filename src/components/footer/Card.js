import React from "react"

const Card = props => (
  <div
    className={`card card${props.stylePosition}`}
    onClick={() => {
      props.selectCard(props.cardInfo, props.position)
    }}
  >
    {props.cardInfo.name}
    {props.cardInfo.value}
  </div>
)

export default Card
