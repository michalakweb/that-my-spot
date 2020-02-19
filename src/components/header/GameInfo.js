import React from "react"

const GameInfo = props => (
  <div id="game_info">
    <p>turn counter: {props.turnCounter}</p>
    <p>player score: {props.playerScore}</p>
    <p>player score: {props.computerScore}</p>
  </div>
)

export default GameInfo
