import React, { useState } from "react"
import logo from "../images/logo.png"

const WelcomeScreen = props => {
	const [count, setCount] = useState(0)

	return (
		<div id="welcome_screen">
			<div id="welcome_logo" className={count > 0 ? "animDisappear" : ""}>
				<img src={logo} alt="game logo" />
			</div>
			<div id="button_container">
				<button
					id="start_game_btn"
					onClick={() => {
						setCount(count + 1)

						setTimeout(() => {
							props.switchWelcomeScreen()
						}, 300)
					}}
				>
					Start
				</button>
			</div>
			<div id="madeBy">
				Made with{" "}
				<span role="img" aria-label="heart">
					❤️
				</span>{" "}
				by{" "}
				<a
					href="https://www.xing.com/profile/Mateusz_Michalak4"
					target="_blank"
					rel="noopener noreferrer"
				>
					Mateusz Michalak
				</a>{" "}
				in Berlin. Card images by{" "}
				<a
					href="https://www.upwork.com/freelancers/~01d2f506ae225b50af"
					target="_blank"
					rel="noopener noreferrer"
				>
					Tanka Mus.
				</a>
			</div>
		</div>
	)
}

export default WelcomeScreen
