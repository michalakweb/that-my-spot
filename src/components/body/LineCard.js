import React from "react"
import angryImg from "../../images/angry.png"
import sadImg from "../../images/sad.png"
import pielegniarka from "../../images/cards/1pielegniarka.png"
import baba from "../../images/cards/2baba.png"
import dzieciak from "../../images/cards/3dzieciak.png"
import palacz from "../../images/cards/4palacz.png"
import partyjniak from "../../images/cards/5partyjniak.png"

const cardImages = [pielegniarka, baba, dzieciak, palacz, partyjniak]

const LineCard = props => (
	<div className="line_card">
		{props.lineCard.name === "palacz" &&
			!props.lineCard.effect &&
			props.lineCard.effect !== "scared" && (
				<div id="smoke">
					{Array(10)
						.fill(0)
						.map((el, id) => (
							<span key={id} className={`s${id}`}></span>
						))}
				</div>
			)}
		{props.lineCard.name === "pielegniarka" &&
			!!props.lineCard.effect &&
			props.lineCard.effect === "angry" && (
				<div id="angry">
					<img src={angryImg} alt={"expression of anger"}></img>
				</div>
			)}
		{!!props.lineCard.effect &&
			(props.lineCard.effect === "scared" ||
				props.lineCard.effect === -1 ||
				props.lineCard.effect === -2) && (
				<div id="sad">
					<img src={sadImg} alt={"expression of sadness"}></img>
				</div>
			)}
		<img
			alt={props.lineCard.name}
			className="cardPhoto"
			src={cardImages[props.lineCard.id - 1]}
		/>
	</div>
)

export default LineCard
