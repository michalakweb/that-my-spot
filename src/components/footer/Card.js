import React from "react"

const Card = props => (
	<div
		className={`card card${props.stylePosition}`}
		onClick={() => {
			props.selectCard(props.cardInfo, props.position)
		}}
	>
		<div className="card_header">
			<p>{props.cardInfo.value}</p>
		</div>
		<div className="card_body">
			{/* {props.cardInfo.name} */}
			<img
				alt={props.cardInfo.name}
				className="deckCardPhoto"
				src={`/cards/${props.cardInfo.id}${props.cardInfo.name}.png`}
			/>
		</div>
	</div>
)

export default Card
