import React from "react"
import leninImg from "../images/lenin.jpg"

function importAll(r) {
	return r.keys().map(r)
}

let itemImages = importAll(
	require.context("../images/items", false, /\.(png|jpe?g|svg)$/)
)

const collator = new Intl.Collator(undefined, {
	numeric: true,
	sensitivity: "base"
})
itemImages = itemImages.sort(collator.compare)

const ItemScreen = props => (
	<div>
		{!props.showWinLoseScreen && (
			<div id="win_item_screen">
				<div
					id={
						props.multiplayerModeOn
							? "multi_win_item_screen_player"
							: "win_item_screen_player"
					}
				>
					<div id="wisp_container">
						<div id="wisp_container_photo">
							<img
								alt="hey"
								src={
									props.playerItems.length > 0
										? itemImages[
												props.playerItems[
													props.playerItems.length - 1
												].id - 1
										  ]
										: ""
								}
							/>
						</div>
						<div id="wisp_container_text">
							<p>
								{props.playerItems.length > 0
									? props.playerItems[
											props.playerItems.length - 1
									  ].trueName
									: ""}
								{props.multiplayerModeOn ? (
									<span>
										{" "}
										goes to {props.multiPlayerNick}
									</span>
								) : (
									<span> goes to the opponent.</span>
								)}
							</p>
						</div>
					</div>
				</div>
				<div id="win_item_screen_divider"></div>
				<div
					id={
						props.multiplayerModeOn
							? "multi_win_item_screen_computer"
							: "win_item_screen_computer"
					}
				>
					<div id="wisc_container">
						<div
							id={
								props.multiplayerModeOn
									? "multi_wisc_container_photo"
									: "wisc_container_photo"
							}
						>
							<img
								alt="hey"
								src={
									props.playerItems.length > 0
										? itemImages[
												props.computerItems[
													props.computerItems.length -
														1
												].id - 1
										  ]
										: ""
								}
							/>
						</div>
						<div
							id={
								props.multiplayerModeOn
									? "multi_wisc_container_text"
									: "wisc_container_text"
							}
						>
							<p>
								{props.computerItems.length > 0
									? props.computerItems[
											props.computerItems.length - 1
									  ].trueName
									: ""}
								{props.multiplayerModeOn ? (
									<span>
										{" "}
										goes to {props.multiOpponentNick}
									</span>
								) : (
									<span> goes to the opponent.</span>
								)}
							</p>
						</div>
					</div>
				</div>
				<div id="win_item_screen_btn_background"></div>
				<div
					id="win_item_screen_btn"
					onClick={() => {
						// finishing game conditions
						if (!props.multiplayerModeOn) {
							if (
								props.deckComputer.length === 0 &&
								props.handComputer.length === 0 &&
								props.winLoseScreenFlag &&
								props.deckPlayer.length === 0 &&
								props.handPlayer.length === 0
							) {
								props.finishGame()
							} else {
								props.switchItemsScreen()
							}
						} else if (props.multiplayerModeOn) {
							if (
								props.winLoseScreenFlag &&
								props.deckPlayer.length === 0 &&
								props.handPlayer.length === 0 &&
								props.multiOpponentHasNoCards
							) {
								props.finishGame()
							} else {
								props.switchItemsScreen()
							}
						}
					}}
				></div>
				{props.itemPlayerMsg === "" && props.itemComputerMsg === "" && (
					<div id="drawScreen">
						<img
							src={leninImg}
							alt="Lenin saying 'It's a draw'"
						></img>
					</div>
				)}
			</div>
		)}
	</div>
)

export default ItemScreen
