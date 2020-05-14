import React from "react"
import Logo from "./Logo"
import GameInfo from "./GameInfo"
import LangSettings from "./LangSettings"

const Header = props => (
	<div id="header">
		<Logo showWelcomeScreen={props.showWelcomeScreen} />
		<GameInfo
			playerScore={props.playerScore}
			computerScore={props.computerScore}
			playerPenalty={props.playerPenalty}
			computerPenalty={props.computerPenalty}
			computerThinking={props.computerThinking}
			turnCounter={props.turnCounter}
			computerDrawsCard={props.computerDrawsCard}
			// Multiplayer
			// Multiplayer
			multiplayerModeOn={props.multiplayerModeOn}
			multiAvatarId={props.multiAvatarId}
			multiOpponentAvatarId={props.multiOpponentAvatarId}
			multiTurn={props.multiTurn}
		/>
		<LangSettings switchTutorialScreen={props.switchTutorialScreen} />
	</div>
)

export default Header
