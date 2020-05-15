import React from "react"
import OverallScore from "./OverallScore"
import CardContainer from "./CardContainer"
import ExtraInfo from "./ExtraInfo"

const Footer = props => (
	<div id="footer">
		<OverallScore
			playerOverallScore={props.playerOverallScore}
			computerOverallScore={props.computerOverallScore}
		/>
		<CardContainer
			handPlayer={props.handPlayer}
			selectCard={props.selectCard}
			lineCards={props.lineCards}
		/>
		<ExtraInfo
			drawCard={props.drawCard}
			currentPhase={props.currentPhase}
			handPlayer={props.handPlayer}
			cardsDeckLeftPlayer={props.cardsDeckLeftPlayer}
			// Multiplayer
			multiDrawCard={props.multiDrawCard}
			multiplayerModeOn={props.multiplayerModeOn}
		/>
	</div>
)

export default Footer
