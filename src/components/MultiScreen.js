import React from "react"
import multiAvatar1 from "../images/1multi.jpg"
import multiAvatar2 from "../images/2multi.jpg"

const MultiScreen = props => (
	<div id="multi_screen">
		multi screen
		<img
			src={multiAvatar1}
			alt="woman"
			onClick={() => {
				props.setMultiAvatar(1)
			}}
		/>
		<img
			src={multiAvatar2}
			alt="marx"
			onClick={() => {
				props.setMultiAvatar(2)
			}}
		/>
		<input onChange={props.changeMultiNick} value={props.multiPlayerNick} />
	</div>
)

export default MultiScreen
