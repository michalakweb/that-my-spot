import React from "react"

const LineCard = props => (
  <div className="line_card">
    {props.lineCard.name}
    {props.lineCard.value}
  </div>
)

export default LineCard
