import React from "react"
import plusImg from "../../images/plus.png"

const ExtraInfo = props => (
	<div id="extra_info">
		<div id="cards_left_container">
			{props.cardsDeckLeftPlayer > 0 && props.handPlayer.length < 5 && (
				<img
					className={props.handPlayer.length === 0 ? "pulse" : ""}
					src={plusImg}
					alt="add cards icon"
					onClick={() => {
						if (
							!props.multiplayerModeOn &&
							props.currentPhase === 1 &&
							props.handPlayer.length < 5
						) {
							props.drawCard()
						} else if (
							props.multiplayerModeOn &&
							props.handPlayer.length < 5
						) {
							props.multiDrawCard()
						}
					}}
				/>
			)}
			<p>{props.cardsDeckLeftPlayer}</p>
		</div>
	</div>
)

export default ExtraInfo
