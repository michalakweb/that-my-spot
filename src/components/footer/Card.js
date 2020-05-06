import React from "react"
import pielegniarka from "../../images/cards/1pielegniarka.png"
import baba from "../../images/cards/2baba.png"
import dzieciak from "../../images/cards/3dzieciak.png"
import palacz from "../../images/cards/4palacz.png"
import partyjniak from "../../images/cards/5partyjniak.png"

const cardImages = [pielegniarka, baba, dzieciak, palacz, partyjniak]

const Card = props => (
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
				src={cardImages[props.cardInfo.id - 1]}
			/>
		</div>
	</div>
)

export default Card
