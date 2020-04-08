import React from "react"

const Item = (props) => (
	<div className="item">
		<div className="item_header">
			<p>{props.item.value}</p>
		</div>
		<div className="item_body">
			{/* <p>{props.item.name}</p> */}
			<img
				className="itemPhoto"
				src={`/items/${props.item.id}${props.item.name}.png`}
				alt={props.item.name}
			/>
		</div>
	</div>
)

export default Item
