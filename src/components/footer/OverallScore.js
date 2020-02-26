import React from "react"

const OverallScore = props => (
  <div id="overall_score">
    <p>Item score:</p>
    <p>player: {props.playerOverallScore}</p>
    <p>pc: {props.computerOverallScore}</p>
    <p>turn left: {3 - props.turnCounter / 2}</p>
  </div>
)

export default OverallScore
