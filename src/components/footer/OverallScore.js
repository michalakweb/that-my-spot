import React from "react"
import itemsValueImg from "../../images/itemsvalue.png"

const OverallScore = (props) => (
	<div id="overall_score">
		<img src={itemsValueImg} id="items_value_img" alt="items value img" />
		<div id="items_value_container">
			<p id="items_value_player">{props.playerOverallScore}</p>
			<p id="items_value_break">/</p>
			<p id="items_value_computer">{props.computerOverallScore}</p>
		</div>
	</div>
)

export default OverallScore
