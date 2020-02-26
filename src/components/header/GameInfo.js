import React from "react"
import computerImage from "../../images/odra.jpg"

const GameInfo = props => (
  <div id="game_info">
    <div id="player_info_container">
      <p>turn left: {3 - props.turnCounter / 2}</p>
      <p>player score: {props.playerScore}</p>
    </div>
    <div id="computer_info_container">
      <div id="computer_card">
        <div id="computer_card_photo">
          <img src={computerImage} alt="old computer" />
        </div>
        <div id="computer_card_info">
          <p>ai score: {props.computerScore}</p>
        </div>
      </div>
    </div>
  </div>
)

export default GameInfo
