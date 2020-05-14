import React from "react"
import computerImage from "../../images/odra.jpg"
import playerImage from "../../images/player.jpg"
import turnsLeftImage from "../../images/turnsleft.png"
// Multiplayer
import multiAvatar1 from "../../images/1multi.jpg"
import multiAvatar2 from "../../images/2multi.jpg"

const multiAvatars = [multiAvatar1, multiAvatar2]

const GameInfo = props => (
	<div id="game_info">
		<div id="player_info_container">
			<div id="card">
				<div id="card_photo">
					<img
						src={
							props.multiplayerModeOn
								? props.multiTurn === 1
									? multiAvatars[props.multiAvatarId - 1]
									: multiAvatars[
											props.multiOpponentAvatarId - 1
									  ]
								: playerImage
						}
						alt="player avatar"
						className={
							!props.computerThinking
								? "pulsePlayer"
								: "undefined"
						}
					/>
				</div>
				<div id="card_info">
					<p className="turnScorePlayer">
						{props.playerScore - props.playerPenalty}
					</p>
				</div>
			</div>
		</div>
		<div id="computer_info_container">
			<div id="card">
				<div id="card_photo">
					<img
						src={
							props.multiplayerModeOn
								? props.multiTurn === 2
									? multiAvatars[props.multiAvatarId - 1]
									: multiAvatars[
											props.multiOpponentAvatarId - 1
									  ]
								: computerImage
						}
						alt="opponent avatar"
						className={
							props.computerThinking ? "pulse" : "undefined"
						}
					/>
				</div>
				<div id="card_info">
					<p className="turnScoreComputer">
						{props.computerScore - props.computerPenalty}
					</p>
				</div>
			</div>
			{props.computerDrawsCard && (
				<div id="computer_takes_card_info">takes card...</div>
			)}
		</div>
		<div id="turns_left_container">
			<img src={turnsLeftImage} alt="turns left" id="turns_left_image" />
			<p id="turns_left_text">{Math.floor(3 - props.turnCounter / 2)}</p>
		</div>
	</div>
)

export default GameInfo
