import React from "react"
import computerImage from "../../images/odra.jpg"
import playerImage from "../../images/player.jpg"

const GameInfo = props => (
  <div id="game_info">
    <div id="player_info_container">
      <div id="card">
        <div id="card_photo">
          <img
            src={playerImage}
            alt="face of communist pioneer"
            className={!props.computerThinking && "pulsePlayer"}
          />
        </div>
        <div id="card_info">
          <p>{props.playerScore}</p>
        </div>
      </div>
    </div>
    <div id="computer_info_container">
      <div id="card">
        <div id="card_photo">
          <img
            src={computerImage}
            alt="old computer"
            className={props.computerThinking && "pulse"}
          />
        </div>
        <div id="card_info">
          <p>{props.computerScore}</p>
        </div>
      </div>
    </div>
  </div>
)

export default GameInfo
