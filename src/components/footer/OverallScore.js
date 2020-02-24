import React from "react"

const OverallScore = props => (
  <div id="overall_score">
    <p>Item score:</p>
    <p>player: {props.playerOverallScore}</p>
    <p>pc: {props.computerOverallScore}</p>
  </div>
)

export default OverallScore
