import React from "react"
import Logo from "./Logo"
import GameInfo from "./GameInfo"
import LangSettings from "./LangSettings"

const Header = (props) => (
	<div id="header">
		<Logo />
		<GameInfo
			playerScore={props.playerScore}
			computerScore={props.computerScore}
			computerThinking={props.computerThinking}
			turnCounter={props.turnCounter}
		/>
		<LangSettings />
	</div>
)

export default Header
