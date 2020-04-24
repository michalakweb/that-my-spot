import React from "react"
import logo from "../images/logo.png"
import filmRoll1 from "../images/filmRoll1.png"
import lenin from "../images/lenin.jpg"

const WelcomeScreen = (props) => (
	<div id="welcome_screen">
		<div id="film_roll_1">
			<img src={filmRoll1}></img>
		</div>
		<div id="lenin">
			<img src={lenin}></img>
		</div>
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
