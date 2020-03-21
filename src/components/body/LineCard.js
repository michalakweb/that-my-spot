import React from "react"

const LineCard = props => (
	<div className="line_card">
		{/* {props.lineCard.name}
		{props.lineCard.value} */}
		<img
			alt="nurse card"
			className="cardPhoto"
			src={`/cards/${props.lineCard.id}${props.lineCard.name}.png`}
		/>
	</div>
)

export default LineCard
