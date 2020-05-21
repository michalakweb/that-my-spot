import React from "react"
import multiAvatar1 from "../images/1multi.jpg"
import multiAvatar2 from "../images/2multi.jpg"
import multiAvatar3 from "../images/3multi.jpg"
import multiAvatar4 from "../images/4multi.jpg"

const multiAvatars = [multiAvatar1, multiAvatar2, multiAvatar3, multiAvatar4]

const MultiScreen = props => {
	let multiUsers = [...props.multiUsers]

	return (
		<div id="multi_screen">
			{/* Selecting avatar and nickname */}
			{props.multiSpaceId === null && (
				<div>
					multi screen
					{multiAvatars.map((el, id) => (
						<img
							key={id}
							src={multiAvatars[id]}
							alt="multiplayer avatar"
							onClick={() => {
								props.setMultiAvatar(id)
							}}
						/>
					))}
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
			{props.multiTurn === null &&
				props.multiInviteReceived &&
				props.multiOpponentAvatarId !== null &&
				props.multiOpponentNick !== null && (
					<div>
						<img
							src={multiAvatars[props.multiOpponentAvatarId]}
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
