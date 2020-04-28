import React from "react"

const Card = (props) => (
	<div
		className={`card card${props.stylePosition}`}
		onClick={() => {
			if (props.lineCards.length <= 6) {
				props.selectCard(props.cardInfo, props.position)
			}
		}}
	>
		<div className="card_header">
			<p>{props.cardInfo.value}</p>
		</div>
		<div className="card_body">
			<img
				alt={props.cardInfo.name}
				className={
					props.cardInfo.id === 3
						? "deckCardPhotoKid"
						: "deckCardPhoto"
				}
				src={`/cards/${props.cardInfo.id}${props.cardInfo.name}.png`}
			/>
		</div>
	</div>
)

export default Card
