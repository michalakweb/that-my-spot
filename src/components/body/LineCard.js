import React from "react"
import angryImg from "../../images/angry.png"
import sadImg from "../../images/sad.png"

const LineCard = (props) => (
	<div className="line_card">
		{props.lineCard.name === "palacz" &&
			!props.lineCard.effect &&
			props.lineCard.effect !== "scared" && (
				<div id="smoke">
					<span className="s0"></span>
					<span className="s1"></span>
					<span className="s2"></span>
					<span className="s3"></span>
					<span className="s4"></span>
					<span className="s5"></span>
					<span className="s6"></span>
					<span className="s7"></span>
					<span className="s8"></span>
					<span className="s9"></span>
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
				props.lineCard.effect === -1) && (
				<div id="sad">
					<img src={sadImg} alt={"expression of sadness"}></img>
				</div>
			)}
		<img
			alt={props.lineCard.name}
			className="cardPhoto"
			src={`/cards/${props.lineCard.id}${props.lineCard.name}.png`}
		/>
	</div>
)

export default LineCard
