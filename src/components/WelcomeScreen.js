import React from "react"
import logo from "../images/logo.png"

const WelcomeScreen = (props) => (
	<div id="welcome_screen">
		<div id="welcome_logo">
			<img src={logo} alt="game logo" />
		</div>
		<div id="button_container">
			<button
				id="start_game_btn"
				onClick={() => {
					props.switchWelcomeScreen()
				}}
			>
				Start
			</button>
		</div>
	</div>
)

export default WelcomeScreen
