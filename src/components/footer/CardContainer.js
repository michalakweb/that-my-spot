import React from "react"
import Card from "./Card"

const CardContainer = (props) => (
	<div id="card_container">
		{props.handPlayer.map((el, id) => {
			let stylePosition = [0, 1, 2, 3, 4]

			if (props.handPlayer.length === 3) {
				stylePosition = [1, 2, 3]
			} else if (props.handPlayer.length === 2) {
				stylePosition = [6, 3]
			} else if (props.handPlayer.length === 1) {
				stylePosition = [2]
			} else if (props.handPlayer.length === 4) {
				stylePosition = [0, 1, 2, 5]
			}

			return (
				<Card
					lineCards={props.lineCards}
					cardInfo={el}
					key={id}
					selectCard={props.selectCard}
					position={id}
					stylePosition={stylePosition[id]}
				/>
			)
		})}
	</div>
)

export default CardContainer
