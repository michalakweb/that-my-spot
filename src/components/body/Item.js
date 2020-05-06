import React from "react"

function importAll(r) {
	return r.keys().map(r)
}

let itemImages = importAll(
	require.context("../../images/items", false, /\.(png|jpe?g|svg)$/)
)

const collator = new Intl.Collator(undefined, {
	numeric: true,
	sensitivity: "base"
})
itemImages = itemImages.sort(collator.compare)

const Item = props => (
	<div className="item">
		<div className="item_header">
			<p>{props.item.value}</p>
		</div>
		<div className="item_body">
			<img
				className="itemPhoto"
				src={itemImages[props.item.id - 1]}
				alt={props.item.name}
			/>
		</div>
	</div>
)

export default Item
