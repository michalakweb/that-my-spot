import React from "react"

const WinLoseScreen = (props) => (
	<div id="win_lose_screen">
		<div id="win_lose_info_container">
			{props.playerFinalScore > props.computerFinalScore ? (
				<p>You won!</p>
			) : (
				<p>You lost!</p>
			)}
		</div>
		<div id="button_container">
			<button
				id="start_game_btn"
				onClick={() => {
					props.switchWinLoseScreen()
				}}
			>
				Play again
			</button>
		</div>
	</div>
)

export default WinLoseScreen
