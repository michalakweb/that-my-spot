import React from "react"

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
		<img
			alt="nurse card"
			className="cardPhoto"
			src={`/cards/${props.lineCard.id}${props.lineCard.name}.png`}
		/>
	</div>
)

export default LineCard
