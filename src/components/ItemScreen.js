import React from "react"

const ItemScreen = (props) => (
	<div id="win_item_screen">
		<div id="win_item_screen_player">
			<div id="wisp_container">
				<div id="wisp_container_photo">
					<img
						alt="hey"
						src={
							props.playerItems.length > 0
								? `/items/${
										props.playerItems[
											props.playerItems.length - 1
										].id
								  }${
										props.playerItems[
											props.playerItems.length - 1
										].name
								  }.png`
								: ""
						}
					/>
				</div>
				<div id="wisp_container_text">
					<p>
						{props.playerItems.length > 0
							? props.playerItems[props.playerItems.length - 1]
									.trueName
							: ""}
						<span> is yours!</span>
					</p>
				</div>
			</div>
			{/* <p>{props.itemPlayerMsg}</p>
			<p>{props.itemComputerMsg}</p>
			{props.itemPlayerMsg === "" && props.itemComputerMsg === "" && (
				<p>A draw - nobody gets anything</p>
			)} */}
		</div>
		<div id="win_item_screen_divider"></div>
		<div id="win_item_screen_computer">
			<div id="wisc_container">
				<div id="wisc_container_photo">
					<img
						alt="hey"
						src={
							props.playerItems.length > 0
								? `/items/${
										props.computerItems[
											props.computerItems.length - 1
										].id
								  }${
										props.computerItems[
											props.computerItems.length - 1
										].name
								  }.png`
								: ""
						}
					/>
				</div>
				<div id="wisc_container_text">
					<p>
						{props.computerItems.length > 0
							? props.computerItems[
									props.computerItems.length - 1
							  ].trueName
							: ""}
						<span> goes to the opponent.</span>
					</p>
				</div>
			</div>
		</div>
		<div id="win_item_screen_btn_background"></div>
		<div
			id="win_item_screen_btn"
			onClick={() => {
				props.switchItemsScreen()
			}}
		></div>
	</div>
)

export default ItemScreen
