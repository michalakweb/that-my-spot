import React from "react"
import multiAvatar1 from "../images/1multi.jpg"
import multiAvatar2 from "../images/2multi.jpg"

const MultiScreen = props => {
	let multiUsers = [...props.multiUsers]

	return (
		<div id="multi_screen">
			{props.multiSpaceId === null && (
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
					<input
						onChange={props.changeMultiNick}
						value={props.multiPlayerNick}
					/>
					<button
						onClick={props.setMultiSpace}
						disabled={
							props.multiPlayerNick !== "" &&
							props.multiAvatarId !== null
								? false
								: true
						}
					>
						next
					</button>
				</div>
			)}

			<div>
				<ul>
					{multiUsers.map((user, id) => (
						<li
							key={id}
							multispaceid={user.multiSpaceId}
							onClick={el => {
								let multiOpponentId = el.target.getAttribute(
									"multispaceid"
								)

								props.multiSendInvite(multiOpponentId)
							}}
						>
							{user.multiPlayerNick}
						</li>
					))}
				</ul>
			</div>

			{props.multiSpaceId !== null && <div></div>}
		</div>
	)
}

export default MultiScreen
