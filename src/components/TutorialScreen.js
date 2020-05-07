import React from "react"
import tutorialPulse from "../images/tutorialPulse.png"
import tutorialDraw from "../images/tutorialDraw.png"
import tutorialItemPoints from "../images/tutorialItemPoints.png"
import tutorialCardPoints from "../images/tutorialCardPoints.png"
import tutorialValueItem from "../images/tutorialValueItem.png"
import smokerCard from "../images/cards/4palacz.png"
import nurseCard from "../images/cards/1pielegniarka.png"

const TutorialScreen = props => (
	<div id="win_lose_screen">
		<div id="win_lose_info_container">
			<div id="game_rules">
				<h2>Rules</h2>

				<p>
					&quot;Queue&quot; is a card game, set in Poland during the
					socialist period.&nbsp;
				</p>
				<p>
					<br />
				</p>
				<p>
					Due to a shortage a products and a generally weak economy,
					people had to often stand in long queues, even for the most
					basic products. &nbsp;
				</p>
				<p>
					<br />
				</p>
				<p>
					Your goal is to get as many high-valuable items as possible.
					The game ends when both players run out of cards.
				</p>
				<p>
					<br />
				</p>
				<h3>GENERAL RULES</h3>
				<p>
					<br />
				</p>
				<p>
					For each queue you and your opponent have three turns, 6 in
					total.&nbsp;
				</p>
				<p>
					<br />
				</p>
				<p>
					When it&#39;s you&#39;r turn, you will see a pulse around
					your avatar:
				</p>
				<img src={tutorialPulse} alt="tutorial Pulse" />
				<p>
					<br />
				</p>
				<p>
					During your turn you can either put a card in the queue (if
					you have any) or draw a card. You can have a maximum of 5
					cards in your hand.
				</p>
				<p>
					<br />
				</p>
				<p>
					In order to put a card in the queue you just have to
					click/tap it twice. In order to draw a card you have to
					click the + button:
				</p>
				<img src={tutorialDraw} alt="tutorial draw" />
				<p>
					<br />
				</p>
				<p>
					After your turn, it&#39;s time for the opponent to make his
					move.&nbsp;
				</p>
				<p>
					<br />
				</p>
				<p>
					The value of cards that the players put in the queue are
					summed and displayed here:
				</p>
				<img src={tutorialCardPoints} alt="tutorial card points" />
				<p>
					<br />
				</p>
				<h3>GETTING ITEMS</h3>
				<p>
					<br />
				</p>
				<p>
					Once the turn counter shows zero, the player whose cards
					were more valuable in the queue gets the item with a higher
					value. An item&#39;s value is displayed on its upper left
					corner:{" "}
				</p>
				<img src={tutorialValueItem} alt="tutorial value item" />
				<p>
					<br />
				</p>
				<p>
					Then the queue is removed and you fight for the next batch
					of items. This cycle continues until both players run out of
					cards.
				</p>
				<p>
					<br />
				</p>
				<p>
					If you and the opponent have an equal amount of points, then
					it&#39;s a draw, nobody gets any items and you have to fight
					for them again in the next queue.
				</p>
				<p>
					<br />
				</p>
				<p>
					You can check what is the sum of your items value at any
					point by looking here:
				</p>
				<img src={tutorialItemPoints} alt="tutorial item points" />
				<p>
					<br />
				</p>
				<p>
					<br />
				</p>
				<h3>CARD VALUES &amp; RELATIONS</h3>
				<p>
					<br />
				</p>
				<p>
					Cards have different values, depending on their type and
					some even offer special bonuses.
				</p>
				<p>
					<br />
				</p>
				<p>
					The value of a card is displayed on its upper left corner.
				</p>
				<p>
					<br />
				</p>
				<p>Cards with effects:</p>
				<p>
					<br />
				</p>
				<div className="tutorialCard">
					<div className="tutorialCardPhoto">
						<img src={smokerCard} alt="smoker card" />
					</div>
					<div className="tutorialCardInfo">
						<p>
							The smoker is a very special card. It will affect a
							card that stands in the que behind or in front of
							him, by taking:&nbsp;
						</p>
						<p>- 1 point from 1-2 point value cards</p>
						<p>- 2 points from a 4 point value card.</p>
						<p>
							<br />
						</p>
						<p>
							It takes points away both from your opponent cards
							and yours, so be careful when using it.
						</p>
						<p>
							<br />
						</p>
						<p>
							Also, it DOES NOT work on other smokers and the
							nurse.
						</p>
						<p>
							<br />
						</p>
					</div>
				</div>
				<div className="tutorialCard">
					<div className="tutorialCardPhoto">
						<img src={nurseCard} alt="nurse card" />
					</div>
					<div className="tutorialCardInfo">
						<p>
							A nurse card is your protection against the smoker.
						</p>
						<p>
							<br />
						</p>
						<p>
							If there is a nurse card present behind or in front
							of a smoker, the nurse will remove the smoker&#39;s
							ability to take points.&nbsp;
						</p>
					</div>
				</div>
				<p>
					<br />
				</p>
				<p>
					<br />
				</p>
				<p>I hope you have fun with the game!&nbsp;</p>
			</div>
		</div>
		<div id="win_item_screen_btn_background"></div>
		<div
			id="win_item_screen_btn"
			onClick={() => {
				props.switchTutorialScreen()
			}}
		></div>
	</div>
)

export default TutorialScreen
