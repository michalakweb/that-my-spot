import React from "react"
import computerImage from "../images/odra.jpg"
import playerImage from "../images/player.jpg"

const WinLoseScreen = props => (
	<div id="win_lose_screen">
		<div id="win_lose_info_container">
			<div id="wlic_winLose">
				{props.playerFinalScore > props.computerFinalScore ? (
					<h2>You won Comrade!</h2>
				) : props.playerFinalScore === props.computerFinalScore ? (
					<h2>It's a draw Comrade!</h2>
				) : (
					<h2>You lost Comrade!</h2>
				)}
			</div>
			<div id="wlic_finalScores">
				<div id="player_info_container">
					<div id="card">
						<div id="card_photo">
							<img
								src={playerImage}
								alt="face of communist pioneer"
							/>
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
							<img src={computerImage} alt="old computer" />
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
				{props.playerItems.map((el, id) => (
					<div key={id} id="wlic_wonItem_card">
						<div id="wlic_wonItem_card_header">
							<div id="wlic_wonItem_card_imgContainer">
								<img
									alt={el.name}
									className="cardPhoto"
									src={`items/${el.id}${el.name}.png`}
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
				}}
			>
				Play again
			</p>
		</div>
	</div>
)

export default WinLoseScreen
