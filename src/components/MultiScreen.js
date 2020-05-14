import React from "react"
import multiAvatar1 from "../images/1multi.jpg"
import multiAvatar2 from "../images/2multi.jpg"

const MultiScreen = props => {
	let multiUsers = [...props.multiUsers]

	return (
		<div id="multi_screen">
			{/* Selecting avatar and nickname */}
			{props.multiSpaceId === null && (
				<div>
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

			{/* Showing a list of available players */}
			{props.multiSpaceId !== null && props.multiOpponentId === null && (
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
			)}

			{/* Showing the invitation prompt */}
			{props.multiInviteReceived &&
				props.multiOpponentAvatarId !== null &&
				props.multiOpponentNick !== null && (
					<div>
						<img
							src={
								props.multiOpponentAvatarId === 1
									? multiAvatar1
									: multiAvatar2
							}
							alt="opponent avatar"
						/>
						<p>{props.multiOpponentNick} wants to play with you!</p>
						<button onClick={props.multiAcceptInvite}>
							Accept
						</button>
						<button onClick={props.multiDeclineInvite}>
							Decline
						</button>
					</div>
				)}
		</div>
	)
}

export default MultiScreen
