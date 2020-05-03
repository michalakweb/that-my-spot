import React from "react"
import "./App.scss"
import _ from "lodash"
import Header from "./components/header/Header"
import Body from "./components/body/Body"
import Footer from "./components/footer/Footer"
import WelcomeScreen from "./components/WelcomeScreen"
import ItemScreen from "./components/ItemScreen"
import WinLoseScreen from "./components/WinLoseScreen"

// Deck & Items db
const deckStats = [
	{ id: 1, name: "pielegniarka", value: 1 },
	{ id: 2, name: "baba", value: 2 },
	{ id: 3, name: "dzieciak", value: 1 },
	{ id: 4, name: "palacz", value: 1 },
	{ id: 5, name: "partyjniak", value: 4 },
]
const deckStats2 = [
	{ id: 2, name: "baba", value: 2 },
	{ id: 2, name: "baba", value: 2 },
	{ id: 3, name: "dzieciak", value: 1 },
	{ id: 4, name: "palacz", value: 1 },
	{ id: 5, name: "partyjniak", value: 4 },
]
const itemStats = [
	{
		id: 1,
		name: "magnetofon",
		value: 7,
		trueName: "Tape recorder AKAI 4000DS",
	},
	{ id: 2, name: "kotek", value: 1, trueName: "Cheap plastic toy" },
	{
		id: 3,
		name: "komputer",
		value: 8,
		trueName: "Microcomputer ELWRO 800 JUNIOR",
	},
	{
		id: 4,
		name: "klawisze",
		value: 5,
		trueName: "Electronic keyboard 'Elwirka'",
	},
	{ id: 5, name: "auto", value: 10, trueName: "Fiat 126P" },
	{ id: 6, name: "gra", value: 3, trueName: "Football family game" },
	{ id: 7, name: "gumka", value: 1, trueName: "Pencil eraser" },
	{ id: 8, name: "herba", value: 3, trueName: "Indian tea 'Darjeeling'" },
	{ id: 9, name: "herbata", value: 2, trueName: "'Popular' tea" },
	{ id: 10, name: "rzutnik", value: 4, trueName: "Diascope Jota B-6" },
	{ id: 11, name: "papier", value: 3, trueName: "Stock of toilet paper" },
	{ id: 12, name: "fajki", value: 1, trueName: "'Sport' cigarettes pack" },
	{
		id: 13,
		name: "telewizorek",
		value: 3,
		trueName: "Mini-TV with slides",
	},
	{
		id: 14,
		name: "sokowirowka",
		value: 4,
		trueName: "Juicer 'Katarzyna'",
	},
	{
		id: 15,
		name: "aparat",
		value: 5,
		trueName: "Camera ami 66",
	},
	{
		id: 16,
		name: "colorofon",
		value: 4,
		trueName: "Colorofon C23-B",
	},
]

class App extends React.Component {
	state = {
		// Game info
		deckPlayer: [...deckStats, ...deckStats2],
		deckComputer: [...deckStats, ...deckStats2],
		handPlayer: [],
		handComputer: [],
		items: [...itemStats],
		itemsLeft: null,
		itemsCurrent: [],
		playerItems: [],
		computerItems: [],
		lineCards: [],
		drawnCardPlayer: [],
		drawnCardComputer: [],
		chosenCard: null,
		chosenCardPosition: null,
		chosenCardConfirm: null,
		lineStats: null,
		cardsDeckLeftPlayer: 10,
		cardsDeckLeftComputer: 10,
		computerDrawsCard: false,

		// Messages
		itemPlayerMsg: "",
		itemComputerMsg: "",
		itemDrawMsg: "It was a draw. Nobody gets anything.",

		// Phase tracking
		computerThinking: false,
		currentPhase: 0,
		turnCounter: 0,

		// Scores
		playerScore: 0,
		computerScore: 0,
		playerOverallScore: 0,
		computerOverallScore: 0,
		playerPenalty: 0,
		computerPenalty: 0,

		// Settings
		currentLanguage: "en",
		phaseOneFlag: true,
		phaseTwoFlag: true,
		phaseThreeFlag: true,
		noClicking: false,

		// Modals
		showWelcomeScreen: true,
		showWinLoseScreen: false,
		showItemsScreen: false,
		itemsScreenFlag: true,
		winLoseScreenFlag: true,
	}

	componentDidMount() {
		this.shuffleItems(this.state.items)
		this.shuffleCards(this.state.deckComputer, "deckComputer")
		this.shuffleCards(this.state.deckPlayer, "deckPlayer")
	}

	componentDidUpdate() {
		//   completion conditions for phase 0
		if (
			this.state.phaseOneFlag &&
			this.state.currentPhase === 0 &&
			this.state.itemsCurrent.length > 0 &&
			this.state.handComputer.length > 0 &&
			this.state.handPlayer.length > 0
		) {
			this.setState(
				{
					phaseOneFlag: false,
					currentPhase: 1,
					turnCounter: 0,
				},
				() => {
					console.log("switched to phase 1")
				}
			)
		}

		// sending card to line --player
		if (
			this.state.phaseTwoFlag &&
			this.state.chosenCard !== null &&
			this.state.chosenCardConfirm !== null &&
			this.state.chosenCard === this.state.chosenCardConfirm &&
			this.state.currentPhase === 1
		) {
			this.sendCardToLinePlayer()
		}

		// sending card to line --computer
		if (this.state.phaseThreeFlag && this.state.currentPhase === 2) {
			this.sendCardToLineComputer()
		}

		// six turns - time for items
		if (
			this.state.turnCounter === 6 &&
			this.state.itemsScreenFlag &&
			this.state.noClicking === false
		) {
			this.setState(
				{
					noClicking: true,
				},
				() => {
					setTimeout(() => {
						this.distributeItems()
					}, 2100)
				}
			)
		}
	}

	switchWelcomeScreen = () => {
		this.setState({
			showWelcomeScreen: false,
		})
	}

	switchItemsScreen = () => {
		this.setState({
			showItemsScreen: false,
		})
	}

	switchWinLoseScreen = () => {
		this.setState({
			showWinLoseScreen: false,
			showItemsScreen: false,
			winLoseScreenFlag: true,
			playerOverallScore: 0,
			computerOverallScore: 0,
			playerItems: [],
		})
	}

	shuffleItems = (items) => {
		let itemsCopy = [...items]
		console.log("shuffling items")

		function randomizeItems(items) {
			let j, x, i
			for (i = items.length - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1))
				x = items[i]
				items[i] = items[j]
				items[j] = x
			}
		}

		// sorting items
		let sortedItems = itemsCopy.sort((a, b) => a.value - b.value)
		let lowValItems = sortedItems.splice(0, items.length / 2)
		let highValItems = sortedItems

		// randomizing
		randomizeItems(lowValItems)
		randomizeItems(highValItems)

		console.log("low", lowValItems)
		console.log("high", highValItems)

		// combining items into low/high pairs
		let combinedItems = []
		lowValItems.forEach((el, id) => {
			combinedItems = [...combinedItems, lowValItems[id]]
			combinedItems = [...combinedItems, highValItems[id]]
		})

		this.setState(
			{
				items: [...combinedItems],
			},
			() => {
				this.drawItemsFromDeck([...combinedItems])
			}
		)
	}

	shuffleCards = (array, stateName) => {
		// add source for card sets
		let arr = [...array].map((obj) => ({ ...obj, source: stateName }))

		console.log(`shuffling cards for ${stateName}`)
		var j, x, i
		for (i = arr.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1))
			x = arr[i]
			arr[i] = arr[j]
			arr[j] = x
		}

		this.setState(
			{
				[stateName]: [...arr],
			},
			() => {
				this.drawCardsFromDeck([...arr], stateName)
			}
		)
	}

	drawItemsFromDeck = (array) => {
		console.log("drawing items")

		var itemsCurrent = array.splice(-2, 2)
		this.setState(
			{
				items: array,
				itemsCurrent: itemsCurrent.sort((a, b) => b.value - a.value),
			},
			() => {
				this.setState({
					itemsLeft: this.state.items.length,
				})
			}
		)
	}

	drawCardsFromDeck = (array, stateName) => {
		console.log(`drawing cards for ${stateName}`)

		var currentHand = array.splice(-5, 5)
		if (stateName === "deckComputer") {
			this.setState(
				{
					[stateName]: array,
					handComputer: currentHand,
				},
				() => {
					this.setState({
						cardsDeckLeftComputer: this.state.deckPlayer.length,
					})
				}
			)
		} else {
			this.setState(
				{
					[stateName]: array,
					handPlayer: currentHand,
				},
				() => {
					this.setState({
						cardsDeckLeftPlayer: this.state.deckPlayer.length,
					})
				}
			)
		}
	}

	drawCard = () => {
		console.log("player one draws a card")

		let drawnCard = this.state.deckPlayer.splice(
			this.state.deckPlayer.length - 1,
			1
		)[0]

		this.setState((prevState) => ({
			handPlayer: [...this.state.handPlayer, drawnCard],
			cardsDeckLeftPlayer: prevState.cardsDeckLeftPlayer - 1,
			phaseTwoFlag: false,
			currentPhase: 2,
			turnCounter: prevState.turnCounter + 1,
		}))
	}

	selectCard = (cardInfo, position) => {
		if (this.state.currentPhase === 1) {
			console.log("the selected card is:", cardInfo)

			this.setState({
				chosenCard: JSON.stringify(cardInfo),
				chosenCardPosition: position,
			})

			if (
				this.state.chosenCard === JSON.stringify(cardInfo) &&
				this.state.chosenCardPosition === position
			) {
				console.log("clicked twice on the same card")

				this.setState({
					chosenCardConfirm: JSON.stringify(cardInfo),
				})
			}
		}
	}

	sendCardToLinePlayer = () => {
		// delete chosen card from player deck
		let playerChosenCard = this.state.handPlayer.splice(
			this.state.chosenCardPosition,
			1
		)[0]

		this.setState(
			(prevState) => ({
				phaseTwoFlag: false,
				currentPhase: 2,
				chosenCard: null,
				chosenCardConfirm: null,
				chosenCardPosition: null,
				lineCards: [
					...this.state.lineCards,
					JSON.parse(this.state.chosenCard),
				],
			}),
			() => {
				console.log("card sent to line by player")

				// updating the scores for player
				this.setState(
					(prevState) => ({
						playerScore:
							prevState.playerScore + playerChosenCard.value,
					}),
					() => {
						this.setState(
							(prevState) => ({
								turnCounter: prevState.turnCounter + 1,
							}),
							() => {
								this.calculateBonus()
								this.applyPenalty()
							}
						)
					}
				)
			}
		)
	}

	// Computer move logic
	sendCardToLineComputer = () => {
		if (this.state.handComputer.length === 0) {
			this.setState({
				computerDrawsCard: true,
			})
		}

		this.setState(
			{
				phaseThreeFlag: false,
				computerThinking: true,
			},
			() => {
				setTimeout(() => {
					console.log("computer move")

					if (this.state.handComputer.length === 0) {
						// no cards left, so has to draw one
						console.log("computer draws a card")

						let drawnCard = this.state.deckComputer.splice(
							this.state.deckPlayer.length - 1,
							1
						)[0]

						this.setState((prevState) => ({
							handComputer: [
								...this.state.handComputer,
								drawnCard,
							],
							cardsDeckLeftComputer:
								prevState.cardsDeckLeftComputer - 1,
							phaseTwoFlag: true,
							phaseThreeFlag: true,
							currentPhase: 1,
							turnCounter: prevState.turnCounter + 1,
							computerThinking: false,
							computerDrawsCard: false,
						}))
					} else {
						let computerChosenCard = ""
						let lastCardInLine = this.state.lineCards[
							this.state.lineCards.length - 1
						]
						let beforeLastCardInLine = this.state.lineCards[
							this.state.lineCards.length - 2
						]

						// if the last card belongs to the player
						// and is a 4-point card then use the smoker
						if (
							this.state.lineCards.length > 0 &&
							lastCardInLine !== undefined &&
							lastCardInLine.name === "partyjniak" &&
							lastCardInLine.source === "deckPlayer" &&
							this.state.handComputer.filter(
								(el) => el.name === "palacz"
							).length > 0
						) {
							let cardId = _.findIndex(this.state.handComputer, {
								name: "palacz",
							})
							computerChosenCard = this.state.handComputer.splice(
								cardId,
								1
							)
							console.log("ai: attack mode")
							// if the before last card belongs to the ai
							// and is a 4-point card and the last one is the smoker belonging
							// to the player - use the nurse
						} else if (
							this.state.lineCards.length > 1 &&
							lastCardInLine !== undefined &&
							beforeLastCardInLine !== undefined &&
							beforeLastCardInLine.name === "partyjniak" &&
							beforeLastCardInLine.source === "deckComputer" &&
							lastCardInLine.name === "palacz" &&
							lastCardInLine.source === "deckPlayer" &&
							this.state.handComputer.filter(
								(el) => el.name === "pielegniarka"
							).length > 0
						) {
							let cardId = _.findIndex(this.state.handComputer, {
								name: "pielegniarka",
							})
							computerChosenCard = this.state.handComputer.splice(
								cardId,
								1
							)
							console.log("ai: protect mode")
						} else {
							// delete first card from computer hand
							computerChosenCard = this.state.handComputer.splice(
								0,
								1
							)

							console.log("deleting firs card in hand")
						}

						this.setState(
							(prevState) => ({
								currentPhase: 3,
								lineCards: [
									...this.state.lineCards,
									...computerChosenCard,
								],
							}),
							() => {
								console.log("card sent to line by computer")

								// updating the scores for computer
								this.setState(
									(prevState) => ({
										computerScore:
											prevState.computerScore +
											computerChosenCard[0].value,
									}),
									() => {
										this.setState(
											(prevState) => ({
												phaseTwoFlag: true,
												phaseThreeFlag: true,
												currentPhase: 1,
												turnCounter:
													prevState.turnCounter + 1,
												computerThinking: false,
											}),
											() => {
												this.calculateBonus()
												this.applyPenalty()
											}
										)
									}
								)
							}
						)
					}
				}, 1000)
			}
		)
	}

	distributeItems = () => {
		console.log("giving items to the winner")
		this.setState(
			(prevState) => ({
				noClicking: false,
				itemsScreenFlag: false,
				turnCounter: 0,
				phaseOneFlag: false,
				currentPhase: 1,
				playerScore: prevState.playerScore - this.state.playerPenalty,
				computerScore:
					prevState.computerScore - this.state.computerPenalty,
				playerPenalty: 0,
				computerPenalty: 0,
			}),
			() => {
				if (this.state.playerScore > this.state.computerScore) {
					console.log("giving items to player")

					this.setState(
						{
							showItemsScreen: true,
							itemsScreenFlag: true,
							playerScore: 0,
							computerScore: 0,
						},
						() => {
							this.setState(
								(prevState) => ({
									playerItems: [
										...prevState.playerItems,
										this.state.itemsCurrent[0],
									],
									playerOverallScore:
										prevState.playerOverallScore +
										this.state.itemsCurrent[0].value,
									itemPlayerMsg: `You got a ${this.state.itemsCurrent[0].name}`,
									computerItems: [
										...prevState.computerItems,
										this.state.itemsCurrent[1],
									],
									computerOverallScore:
										prevState.computerOverallScore +
										this.state.itemsCurrent[1].value,
									itemComputerMsg: `The AI got a ${this.state.itemsCurrent[1].name}`,
									lineCards: [],
								}),
								() => {
									this.drawItemsFromDeck(this.state.items)
								}
							)
						}
					)
				} else if (this.state.playerScore < this.state.computerScore) {
					console.log("giving items to computer")
					this.setState(
						{
							showItemsScreen: true,
							itemsScreenFlag: true,
							playerScore: 0,
							computerScore: 0,
						},
						() => {
							this.setState(
								(prevState) => ({
									playerItems: [
										...prevState.playerItems,
										this.state.itemsCurrent[1],
									],
									playerOverallScore:
										prevState.playerOverallScore +
										this.state.itemsCurrent[1].value,
									itemPlayerMsg: `You got a ${this.state.itemsCurrent[1].name}`,
									computerItems: [
										...prevState.computerItems,
										this.state.itemsCurrent[0],
									],
									computerOverallScore:
										prevState.computerOverallScore +
										this.state.itemsCurrent[0].value,
									itemComputerMsg: `The AI got a ${this.state.itemsCurrent[0].name}`,
									lineCards: [],
								}),
								() => {
									this.drawItemsFromDeck(this.state.items)
								}
							)
						}
					)
				} else {
					console.log("draw - no items given")
					this.setState(
						{
							showItemsScreen: true,
							itemsScreenFlag: true,
							playerScore: 0,
							computerScore: 0,
							itemPlayerMsg: "",
							itemComputerMsg: "",
						},
						() => {
							this.setState({
								lineCards: [],
							})
						}
					)
				}
			}
		)
	}

	finishGame = () => {
		console.log("Players ran out of cards.")
		this.setState(
			{
				showWinLoseScreen: true,
				winLoseScreenFlag: false,
				currentPhase: 0,
				turnCounter: 0,
				playerFinalScore: this.state.playerOverallScore,
				computerFinalScore: this.state.computerOverallScore,
			},
			() => {
				console.log(
					`Final scores: player - ${this.state.playerFinalScore}, AI - ${this.state.computerFinalScore}`
				)
				// reset state
				this.setState(
					{
						deckPlayer: [...deckStats, ...deckStats2],
						deckComputer: [...deckStats, ...deckStats2],
						items: [...itemStats],
						itemsLeft: null,
						itemsCurrent: [],
						computerItems: [],
						lineCards: [],
						cardsDeckLeftPlayer: 10,
						cardsDeckLeftComputer: 10,
						turnCounter: 0,

						// Scores
						playerScore: 0,
						computerScore: 0,

						// Settings
						phaseOneFlag: true,
						phaseTwoFlag: true,
						phaseThreeFlag: true,

						// Modals
						showItemsScreen: false,
						itemsScreenFlag: true,
					},
					() => {
						this.shuffleItems(this.state.items)
						this.shuffleCards(
							this.state.deckComputer,
							"deckComputer"
						)
						this.shuffleCards(this.state.deckPlayer, "deckPlayer")
					}
				)
			}
		)
	}

	calculateBonus = () => {
		this.state.lineCards.forEach((el, id) => {
			let cardBefore = this.state.lineCards[id - 1]
			let cardAfter = this.state.lineCards[id + 1]

			if (el.name === "palacz") {
				if (el.effect === undefined) {
					if (
						cardBefore !== undefined &&
						cardBefore.name !== "palacz"
					) {
						let lineCardsCopy = [...this.state.lineCards]
						if (lineCardsCopy[id - 1].name === "partyjniak") {
							lineCardsCopy[id - 1].effect = -2
						} else {
							lineCardsCopy[id - 1].effect = -1
						}

						this.setState({
							lineCards: [...lineCardsCopy],
						})
					}

					if (
						cardAfter !== undefined &&
						cardAfter.name !== "palacz"
					) {
						let lineCardsCopy = [...this.state.lineCards]
						if (lineCardsCopy[id + 1].name === "partyjniak") {
							lineCardsCopy[id + 1].effect = -2
						} else {
							lineCardsCopy[id + 1].effect = -1
						}

						this.setState({
							lineCards: [...lineCardsCopy],
						})
					}
				} else if (el.effect === "scared") {
					let lineCardsCopy = [...this.state.lineCards]

					if (
						!!lineCardsCopy[id - 1] &&
						!!lineCardsCopy[id - 1].effect &&
						(lineCardsCopy[id - 1].effect === -1 ||
							lineCardsCopy[id - 1].effect === -2)
					) {
						delete lineCardsCopy[id - 1].effect
					}

					if (
						!!lineCardsCopy[id + 1] &&
						!!lineCardsCopy[id + 1].effect &&
						(lineCardsCopy[id + 1].effect === -1 ||
							lineCardsCopy[id + 1].effect === -2)
					) {
						delete lineCardsCopy[id + 1].effect
					}

					this.setState({
						lineCards: [...lineCardsCopy],
					})
				}
			}

			if (el.name === "pielegniarka") {
				if (cardBefore !== undefined && cardBefore.name === "palacz") {
					let lineCardsCopy = [...this.state.lineCards]
					lineCardsCopy[id - 1].effect = "scared"
					lineCardsCopy[id].effect = "angry"

					if (
						!!lineCardsCopy[id - 2] &&
						!!lineCardsCopy[id - 2].effect &&
						(lineCardsCopy[id - 2].effect === -1 ||
							lineCardsCopy[id - 2].effect === -2)
					) {
						delete lineCardsCopy[id - 2].effect
					}

					this.setState({
						lineCards: [...lineCardsCopy],
					})
				}

				if (cardAfter !== undefined && cardAfter.name === "palacz") {
					let lineCardsCopy = [...this.state.lineCards]
					lineCardsCopy[id + 1].effect = "scared"
					lineCardsCopy[id].effect = "angry"

					if (
						!!lineCardsCopy[id + 2] &&
						!!lineCardsCopy[id + 2].effect &&
						(lineCardsCopy[id + 2].effect === -1 ||
							lineCardsCopy[id + 2].effect === -2)
					) {
						delete lineCardsCopy[id + 2].effect
					}

					this.setState({
						lineCards: [...lineCardsCopy],
					})
				}
			}
		})
	}

	applyPenalty = () => {
		let playerCards = [
			...this.state.lineCards.filter((el) => el.source === "deckPlayer"),
		]
		let playerPenalty = 0
		playerCards.forEach((el) => {
			if (!!el.effect && (el.effect === -1 || el.effect === -2)) {
				playerPenalty -= el.effect
			}
		})

		let computerCards = [
			...this.state.lineCards.filter(
				(el) => el.source === "deckComputer"
			),
		]
		let computerPenalty = 0
		computerCards.forEach((el) => {
			if (!!el.effect && (el.effect === -1 || el.effect === -2)) {
				computerPenalty -= el.effect
			}
		})

		this.setState({
			playerPenalty: playerPenalty,
			computerPenalty: computerPenalty,
		})
	}

	render() {
		return (
			<div>
				{this.state.showWelcomeScreen && (
					<WelcomeScreen
						switchWelcomeScreen={this.switchWelcomeScreen}
					/>
				)}

				{this.state.showItemsScreen && (
					<ItemScreen
						switchItemsScreen={this.switchItemsScreen}
						itemPlayerMsg={this.state.itemPlayerMsg}
						itemComputerMsg={this.state.itemComputerMsg}
						playerItems={this.state.playerItems}
						computerItems={this.state.computerItems}
						showWinLoseScreen={this.state.showWinLoseScreen}
						// States necessary for winning conditions:
						deckComputer={this.state.deckComputer}
						handComputer={this.state.handComputer}
						winLoseScreenFlag={this.state.winLoseScreenFlag}
						deckPlayer={this.state.deckPlayer}
						handPlayer={this.state.handPlayer}
						finishGame={this.finishGame}
					/>
				)}

				{this.state.showWinLoseScreen && (
					<WinLoseScreen
						switchWinLoseScreen={this.switchWinLoseScreen}
						playerFinalScore={this.state.playerFinalScore}
						computerFinalScore={this.state.computerFinalScore}
					/>
				)}

				<div
					id="container"
					className={this.state.noClicking ? "noClicking" : ""}
				>
					<div id="flex-container">
						<Header
							playerScore={this.state.playerScore}
							computerScore={this.state.computerScore}
							playerPenalty={this.state.playerPenalty}
							computerPenalty={this.state.computerPenalty}
							computerThinking={this.state.computerThinking}
							turnCounter={this.state.turnCounter}
							computerDrawsCard={this.state.computerDrawsCard}
							showWelcomeScreen={this.state.showWelcomeScreen}
						/>

						<Body
							itemsCurrent={this.state.itemsCurrent}
							lineCards={this.state.lineCards}
						/>

						<Footer
							lineCards={this.state.lineCards}
							handPlayer={this.state.handPlayer}
							cardsDeckLeftPlayer={this.state.cardsDeckLeftPlayer}
							selectCard={this.selectCard}
							playerOverallScore={this.state.playerOverallScore}
							computerOverallScore={
								this.state.computerOverallScore
							}
							drawCard={this.drawCard}
							currentPhase={this.state.currentPhase}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default App
