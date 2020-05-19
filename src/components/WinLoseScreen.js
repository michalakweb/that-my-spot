import React from "react"
import computerImage from "../images/odra.jpg"
import playerImage from "../images/player.jpg"
// Multiplayer
import multiAvatar1 from "../images/1multi.jpg"
import multiAvatar2 from "../images/2multi.jpg"

const multiAvatars = [multiAvatar1, multiAvatar2]

function importAll(r) {
	return r.keys().map(r)
}

let itemImages = importAll(
	require.context("../images/items", false, /\.(png|jpe?g|svg)$/)
)

const collator = new Intl.Collator(undefined, {
	numeric: true,
	sensitivity: "base"
})
itemImages = itemImages.sort(collator.compare)

const WinLoseScreen = props => (
	<div id="win_lose_screen">
		<div id="win_lose_info_container">
			{!props.multiplayerModeOn && (
				<div id="wlic_winLose">
					{props.playerFinalScore > props.computerFinalScore ? (
						<h2>You won Comrade!</h2>
					) : props.playerFinalScore === props.computerFinalScore ? (
						<h2>It's a draw Comrade!</h2>
					) : (
						<h2>You lost Comrade!</h2>
					)}
				</div>
			)}
			{props.multiplayerModeOn && (
				<div id="wlic_winLose">
					{props.multiTurn === 1 &&
					props.playerFinalScore > props.computerFinalScore ? (
						<h2>You won Comrade!</h2>
					) : props.multiTurn === 2 &&
					  props.computerFinalScore > props.playerFinalScore ? (
						<h2>You won Comrade!</h2>
					) : props.playerFinalScore === props.computerFinalScore ? (
						<h2>It's a draw Comrade!</h2>
					) : (
						<h2>You lost Comrade!</h2>
					)}
				</div>
			)}
			<div id="wlic_finalScores">
				<div id="player_info_container">
					<div id="card">
						<div id="card_photo">
							{!props.multiplayerModeOn && (
								<img
									src={playerImage}
									alt="face of communist pioneer"
								/>
							)}
							{props.multiplayerModeOn && (
								<img
									src={
										props.multiTurn === 1
											? multiAvatars[
													props.multiAvatarId - 1
											  ]
											: multiAvatars[
													props.multiOpponentAvatarId -
														1
											  ]
									}
									alt="player1 avatar"
								/>
							)}
						</div>
						<div id="card_info">
							<p className="turnScorePlayer">
								{props.playerFinalScore}
							</p>
						</div>
					</div>
				</div>
				<div id="computer_info_container">
					<div id="card">
						<div id="card_photo">
							{!props.multiplayerModeOn && (
								<img src={computerImage} alt="old computer" />
							)}
							{props.multiplayerModeOn && (
								<img
									src={
										props.multiTurn === 2
											? multiAvatars[
													props.multiAvatarId - 1
											  ]
											: multiAvatars[
													props.multiOpponentAvatarId -
														1
											  ]
									}
									alt="player1 avatar"
								/>
							)}
						</div>
						<div id="card_info">
							<p className="turnScoreComputer">
								{props.computerFinalScore}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div id="wlic_wonItem">
				<p>Your items:</p>
				{/* Single player */}
				{!props.multiplayerModeOn &&
					props.playerItems.map((el, id) => (
						<div key={id} id="wlic_wonItem_card">
							<div id="wlic_wonItem_card_header">
								<div id="wlic_wonItem_card_imgContainer">
									<img
										alt={el.name}
										className="cardPhoto"
										src={itemImages[el.id - 1]}
									/>
								</div>
								<div id="wlic_wonItem_card_info_title">
									<p>{el.trueName}</p>
								</div>
							</div>
							<div id="wlic_wonItem_card_info">
								<div id="wlic_wonItem_card_info_description">
									<p>{el.description}</p>
								</div>
							</div>
						</div>
					))}

				{/* Multiplayer */}
				{props.multiTurn === 1 &&
					props.playerItems.map((el, id) => (
						<div key={id} id="wlic_wonItem_card">
							<div id="wlic_wonItem_card_header">
								<div id="wlic_wonItem_card_imgContainer">
									<img
										alt={el.name}
										className="cardPhoto"
										src={itemImages[el.id - 1]}
									/>
								</div>
								<div id="wlic_wonItem_card_info_title">
									<p>{el.trueName}</p>
								</div>
							</div>
							<div id="wlic_wonItem_card_info">
								<div id="wlic_wonItem_card_info_description">
									<p>{el.description}</p>
								</div>
							</div>
						</div>
					))}
				{props.multiTurn === 2 &&
					props.computerItems.map((el, id) => (
						<div key={id} id="wlic_wonItem_card">
							<div id="wlic_wonItem_card_header">
								<div id="wlic_wonItem_card_imgContainer">
									<img
										alt={el.name}
										className="cardPhoto"
										src={itemImages[el.id - 1]}
									/>
								</div>
								<div id="wlic_wonItem_card_info_title">
									<p>{el.trueName}</p>
								</div>
							</div>
							<div id="wlic_wonItem_card_info">
								<div id="wlic_wonItem_card_info_description">
									<p>{el.description}</p>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
		<div id="wlic_resetGame_btn_background" />
		<div id="wlic_resetGame_btn">
			<p
				onClick={() => {
					props.switchWinLoseScreen()
					props.switchWelcomeScreen()
				}}
			>
				Home screen
			</p>
		</div>
	</div>
)

export default WinLoseScreen
