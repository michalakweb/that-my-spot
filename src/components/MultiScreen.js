import React from "react"
// Multiplayer
import pendingImg from "../images/pending.png"
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
				<div id="multi_screen_player_info">
					<p>Choose your avatar:</p>
					<div id="multi_screen_avatar_select">
						{multiAvatars.map((el, id) => (
							<img
								className={
									props.multiAvatarId === id
										? " full_opacity multi_avatar_img"
										: "multi_avatar_img"
								}
								key={id}
								src={multiAvatars[id]}
								alt="multiplayer avatar"
								onClick={() => {
									props.setMultiAvatar(id)
								}}
							/>
						))}
					</div>
					<div id="multi_screen_login">
						<input
							placeholder="Player nick - max 10 letters!"
							onChange={props.changeMultiNick}
							value={props.multiPlayerNick}
							maxLength="10"
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
				</div>
			)}

			{/* Showing a list of available players */}
			{props.multiSpaceId !== null && props.multiOpponentId === null && (
				<div id="multi_screen_online_players">
					<p>Send an ivitation to:</p>
					<ul id="multi_screen_online_players_list">
						{multiUsers.length === 0 && (
							<li>No users logged in.</li>
						)}
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
					<div id="multi_screen_invitation">
						<div id="multi_screen_invitation_card">
							<img
								src={multiAvatars[props.multiOpponentAvatarId]}
								alt="opponent avatar"
							/>
							<p>
								{props.multiOpponentNick} wants to play with
								you!
							</p>
						</div>
						<div id="multi_screen_invitation_btns">
							<button onClick={props.multiAcceptInvite}>
								Accept
							</button>
							<button onClick={props.multiDeclineInvite}>
								Decline
							</button>
						</div>
					</div>
				)}

			{/* Pending invitation screen */}
			{props.multiInvitePending && (
				<div id="multi_screen_invite_pending">
					<img id="gagarin" src={pendingImg} alt="Gagarin in space" />
					<p>waiting for response</p>
				</div>
			)}
		</div>
	)
}

export default MultiScreen
