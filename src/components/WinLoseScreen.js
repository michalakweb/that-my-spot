import React from "react"

const WinLoseScreen = (props) => (
	<div id="welcome_screen">
		<div id="welcome_logo">
			{console.log(props.playerOverallScore, props.computerOverallScore)}
			{props.playerOverallScore > props.computerOverallScore ? (
				<p>You won!</p>
			) : (
				<p>The AI won! You lost!</p>
			)}
		</div>
		<div id="button_container">
			<button
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
