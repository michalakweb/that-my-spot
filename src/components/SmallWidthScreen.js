import React from "react"
import leninImg from "../images/leninNarrowScreen.jpg"

const SmallWidthScreen = props => (
	<div>
		{!props.showWelcomeScreen && (
			<div id="win_item_screen">
				<div id="smallWidthScreen">
					<img
						src={leninImg}
						alt="Lenin saying that the screen width is to narrow."
					></img>
				</div>
			</div>
		)}
	</div>
)

export default SmallWidthScreen
