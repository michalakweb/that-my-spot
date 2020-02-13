import React from "react"

const Card = props => (
  <div className="card">
    {props.cardInfo.name}
    {props.cardInfo.value}
  </div>
)

export default Card
