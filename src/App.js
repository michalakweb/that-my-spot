import React from "react"
import "./App.scss"
import _ from "lodash"
import Header from "./components/header/Header"
import Body from "./components/body/Body"
import Footer from "./components/footer/Footer"
import WelcomeScreen from "./components/WelcomeScreen"
import ItemScreen from "./components/ItemScreen"
import WinLoseScreen fromgit branch -m <newname> "./components/WinLoseScreen"
import SmallWidthScreen from "./components/SmallWidthScreen"

// Deck & Items db
const deckStats = [
	{ id: 1, name: "pielegniarka", value: 1 },
	{ id: 2, name: "baba", value: 2 },
	{ id: 3, name: "dzieciak", value: 1 },
	{ id: 4, name: "palacz", value: 1 },
	{ id: 5, name: "partyjniak", value: 4 }
]
const deckStats2 = [
	{ id: 2, name: "baba", value: 2 },
	{ id: 2, name: "baba", value: 2 },
	{ id: 3, name: "dzieciak", value: 1 },
	{ id: 4, name: "palacz", value: 1 },
	{ id: 5, name: "partyjniak", value: 4 }
]
const deckStats3 = [
	{ id: 1, name: "pielegniarka", value: 1 },
	{ id: 2, name: "baba", value: 2 },
	{ id: 4, name: "palacz", value: 1 },
	{ id: 5, name: "partyjniak", value: 4 },
	{ id: 5, name: "partyjniak", value: 4 }
]
const itemStats = [
	{
		id: 1,
		name: "magnetofon",
		value: 5,
		trueName: "Tape recorder AKAI 4000DS",
		description:
			"This reel-to-reel tape recorder was made by Akai, a Japanese company based in Tokio, now defunct. Produced in 1972-1973, was considered a luxury product (almost everything produced outside of the Soviet Union was considered that).\n \n Tape recorders were extremely popular in the Eastern Block. Poland at the time didn't have extensive copyright laws and many radio stations played western albums in their enitrety, so people could record it with their tape recorders. Availability of western music was scarce and the prices were extremely high for an average citizen."
	},
	{
		id: 2,
		name: "kotek",
		value: 1,
		trueName: "Cheap plastic brooch",
		description:
			"A brooch made of hideous plastic with a typical fastener, a safety pin. Product from the eighties. "
	},
	{
		id: 3,
		name: "komputer",
		value: 5,
		trueName: "ELWRO 800 JUNIOR",
		description:
			"A microcomputer produced in the eightes for schools. Its heart was the popular at the time 3.5MHz processor Z80 (Zilog). The computer was equipped with 'Basic' programming language interpreter. In one of its modes it was compatible with ZX Spectrum - an undeniable advantage.\n \n For its production the case from 'Elwirka' electronic keyboard was used (both made by the same company)."
	},
	{
		id: 4,
		name: "klawisze",
		value: 5,
		trueName: "Electronic keyboard 'Elwirka'",
		description:
			"'Elwirka' was produced in the eighties and it was meant for kids and teenagers. The quality of the keyboard was pretty good - 2.5octaves, polifonic system and one timbre that could be modified with functions, like vibrato.\n \n Modifications could be mixed, which gave even more sound editing options. A built-in amplifier gave a clear loud sound, but if that wasn't enough, the user could connect the keyboard with external speakers."
	},
	{
		id: 5,
		name: "auto",
		value: 5,
		trueName: "Fiat 126P",
		description:
			"Constructed by Fiat and produced in Italy from 1973 and in Poland between 1973-2000. In Italy the car was marketed as the second, cheaper family car. In the much harsher economical reality of Poland it was the only car families could aspire to.\n \n The car's diminutive dimensions inspired the nickname 'Maluch', which means 'toddler' or 'little one' in Polish."
	},
	{
		id: 6,
		name: "gra",
		value: 3,
		trueName: "Football family game",
		description:
			"An arcade game for at least two players simulating soccer.\n \n The rules of the game are simple. On the pitch there are figurines of players from both teams and two goals. Figures are mounted on springs, with which players can bounce the ball in any direction. In this way, you can pass the ball to other players or aim at the opponent's goal.\n \n Around the figures there are depressions thanks to which the ball can slide under the player's legs.\n \n The game provided great entertainment and was a real hit in socialist Poland."
	},
	{
		id: 7,
		name: "gumka",
		value: 1,
		trueName: "'Mouse' pencil eraser",
		description:
			"'Mouse' eraser - the iconic eraser was produced in several versions. Next to the pen, pencil and sharpener, it was in every school pencil case. In later years, the Mice were displaced for some time by fragrant Chinese erasers."
	},
	{
		id: 8,
		name: "herba",
		value: 3,
		trueName: "Indian tea 'Darjeeling'",
		description:
			"Loose black tea from the province of Darjeeling (India) or the surrounding area.\n \n Considered one of the best Indian teas. In this packaging, available in the eighties."
	},
	{
		id: 9,
		name: "herbata",
		value: 2,
		trueName: "'Popular' tea",
		description:
			"In the eighties it was actually one of the most popular teas.\n \n There wasn't much choice in the stores, so buying such tea was the only way. People just had to accept the reality of those times."
	},
	{
		id: 10,
		name: "rzutnik",
		value: 4,
		trueName: "Diascope Jota B-6",
		description:
			"A popular projector for displaying still black and white or color images from slides or positive film. Films were rolled and stored in small cardboard or plastic boxes.\n \n Due to the availability of a large number of fairy tales on film, this type of device was very much appreciated by children.\n \n The projector was produced at the turn of the sixties and seventies."
	},
	{
		id: 11,
		name: "papier",
		value: 3,
		trueName: "Stock of toilet paper",
		description:
			"Toilet paper was always lacking in Poland during the socialist period. This product was a luxury good for which people stuck in kilometer long queues.\n \n Poles have suffered for decades because of the constant lack of it. There have been cases that some have made desperate attempts to make toilet paper themselves by repeatedly crushing old newspapers."
	},
	{
		id: 12,
		name: "fajki",
		value: 1,
		trueName: "'Sport' cigarettes pack",
		description:
			"'Sport' cigarettes in the seventies were the cheapest generally available cigarettes (without filter).\n \n They could be purchased at every kiosk. At the turn of the seventies and eighties they were replaced by 'Popular' cigarettes. The name change was necessary because smoking with sport had little in common. (duh)"
	},
	{
		id: 13,
		name: "telewizorek",
		value: 3,
		trueName: "Mini-TV with slides",
		description:
			"Toy with microfilm containing several slides. To view the content you had to point the TV towards the light and then look with one eye in the viewfinder. Moving the slides consisted of rotating the protruding microfilm film with your finger.\n \n What's most interesting, these only a dozen or so slides managed to put the whole movie with characters from fairy tales. Product from the seventies and eighties of the last century."
	},
	{
		id: 14,
		name: "sokowirowka",
		value: 4,
		trueName: "Juicer 'Katarzyna'",
		description:
			"Food processor serving mainly as a juicer, but also a blender and grinder. A practical and very functional device, it took up little space.\n \n The first quality mark was in this case a reflection of a really solid, reliable and well thought-out construction."
	},
	{
		id: 15,
		name: "aparat",
		value: 4,
		trueName: "Camera ami 66",
		description:
			"A camera meant for amateur photogrpahy. Produced in the sixties and very fashionable at the time, especially during travel."
	},
	{
		id: 16,
		name: "colorofon",
		value: 4,
		trueName: "Colorofon C23-B",
		description:
			"Device for presenting light effects flashing to the rhythm of the music, produced in the eighties.\n \n This is an improved version of the C-23 model with lower power consumption. In a wooden case covered with veneer, three spotlights with colored filters are installed.\n \n To improve the aesthetics, the front panel is made of 'scratched' aluminum. The built-in electronic control system is designed to turn on the lights when specific sounds occur.\n \n Colorofon was used at home parties as well as class discos."
	}
]

class App extends React.Component {
	state = {
		// Game info
		deckPlayer: [...deckStats, ...deckStats2],
		deckComputer: [...deckStats, ...deckStats3],
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
		showSmallWidthScreen: false,
		showWelcomeScreen: true,
		showWinLoseScreen: false,
		showItemsScreen: false,
		itemsScreenFlag: true,
		winLoseScreenFlag: true,
		showSmallWidthScreenFlag: false,

		// Other
		windowWidth: window.innerWidth,
		error: false
	}

	componentDidMount() {
		this.shuffleItems(this.state.items)
		this.shuffleCards(this.state.deckComputer, "deckComputer")
		this.shuffleCards(this.state.deckPlayer, "deckPlayer")
		this.showViewportWidth()
	}

	componentDidUpdate() {
		// show the "small width screen"
		if (
			this.state.windowWidth < 400 &&
			!this.showSmallWidthScreen &&
			!this.state.showSmallWidthScreenFlag
		) {
			this.setState({
				showSmallWidthScreen: true,
				showSmallWidthScreenFlag: true
			})
		}

		if (
			this.state.windowWidth >= 400 &&
			this.state.showSmallWidthScreenFlag
		) {
			this.setState({
				showSmallWidthScreen: false,
				showSmallWidthScreenFlag: false
			})
		}

		// error for undefined computer hand
		if (
			!this.state.error &&
			(this.state.handComputer.filter(el => el === undefined).length >
				0 ||
				this.state.deckComputer.filter(el => el === undefined).length >
					0)
		) {
			this.setState(
				{
					error: true
				},
				() => {
					console.log("EMERGENCY", this.state)
				}
			)
		}

		// completion conditions for phase 0
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
					turnCounter: 0
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
		if (
			this.state.phaseThreeFlag &&
			this.state.aiCanMove &&
			this.state.currentPhase === 2 &&
			(this.state.turnCounter === 1 ||
				this.state.turnCounter === 3 ||
				this.state.turnCounter === 5)
		) {
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
					noClicking: true
				},
				() => {
					setTimeout(() => {
						this.distributeItems()
					}, 2100)
				}
			)
		}
	}

	showViewportWidth = () => {
		window.addEventListener("resize", () => {
			let windowWidth = window.innerWidth

			this.setState({
				windowWidth: windowWidth
			})
		})

		window.addEventListener("orientationchange", () => {
			let windowWidth = window.innerWidth

			this.setState({
				windowWidth: windowWidth
			})
		})
	}

	switchWelcomeScreen = () => {
		this.setState({
			showWelcomeScreen: false
		})
	}

	switchItemsScreen = () => {
		this.setState({
			showItemsScreen: false
		})
	}

	switchWinLoseScreen = () => {
		this.setState({
			showWinLoseScreen: false,
			showItemsScreen: false,
			winLoseScreenFlag: true,
			playerOverallScore: 0,
			computerOverallScore: 0,
			playerItems: []
		})
	}

	shuffleItems = items => {
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

		// combining items into low/high pairs
		let combinedItems = []
		lowValItems.forEach((el, id) => {
			combinedItems = [...combinedItems, lowValItems[id]]
			combinedItems = [...combinedItems, highValItems[id]]
		})

		this.setState(
			{
				items: [...combinedItems]
			},
			() => {
				this.drawItemsFromDeck([...combinedItems])
			}
		)
	}

	shuffleCards = (array, stateName) => {
		// add source for card sets
		let arr = [...array].map(obj => ({ ...obj, source: stateName }))

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
				[stateName]: [...arr]
			},
			() => {
				this.drawCardsFromDeck([...arr], stateName)
			}
		)
	}

	drawItemsFromDeck = array => {
		console.log("drawing items")

		var itemsCurrent = array.splice(-2, 2)
		this.setState(
			{
				items: array,
				itemsCurrent: itemsCurrent.sort((a, b) => b.value - a.value)
			},
			() => {
				this.setState({
					itemsLeft: this.state.items.length
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
					handComputer: currentHand
				},
				() => {
					this.setState({
						cardsDeckLeftComputer: this.state.deckPlayer.length
					})
				}
			)
		} else {
			this.setState(
				{
					[stateName]: array,
					handPlayer: currentHand
				},
				() => {
					this.setState({
						cardsDeckLeftPlayer: this.state.deckPlayer.length
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

		this.setState(prevState => ({
			handPlayer: [...this.state.handPlayer, drawnCard],
			cardsDeckLeftPlayer: prevState.cardsDeckLeftPlayer - 1,
			phaseTwoFlag: false,
			currentPhase: 2,
			turnCounter: prevState.turnCounter + 1,
			aiCanMove: true
		}))
	}

	selectCard = (cardInfo, position) => {
		if (this.state.currentPhase === 1) {
			console.log("player selected card is:", cardInfo)

			this.setState({
				chosenCard: JSON.stringify(cardInfo),
				chosenCardPosition: position
			})

			if (
				this.state.chosenCard === JSON.stringify(cardInfo) &&
				this.state.chosenCardPosition === position
			) {
				console.log("clicked twice on the same card")

				this.setState({
					chosenCardConfirm: JSON.stringify(cardInfo)
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
			prevState => ({
				phaseTwoFlag: false,
				currentPhase: 2,
				chosenCard: null,
				chosenCardConfirm: null,
				chosenCardPosition: null,
				lineCards: [
					...this.state.lineCards,
					JSON.parse(this.state.chosenCard)
				]
			}),
			() => {
				console.log("card sent to line by player")

				// updating the scores for player
				this.setState(
					prevState => ({
						playerScore:
							prevState.playerScore + playerChosenCard.value
					}),
					() => {
						this.setState(
							prevState => ({
								turnCounter: prevState.turnCounter + 1,
								aiCanMove: true
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
		console.log("ai move")
		this.setState(
			{
				aiCanMove: false
			},
			() => {
				let hasNoCardsInHand = this.state.handComputer.length === 0
				let hasCardsInHand = this.state.handComputer.length > 0
				let hasLessThan5CardsInHand = this.state.handComputer.length < 5
				let hasCardsInDeck = this.state.deckComputer.length > 0
				let isLastTurn = this.state.turnCounter === 5
				let playerTurnScore =
					this.state.playerScore - this.state.playerPenalty
				let computerTurnScore =
					this.state.computerScore - this.state.computerPenalty
				let turnScoreDiff = playerTurnScore - computerTurnScore
				let itemsScoreDiff = Math.abs(
					this.state.playerOverallScore -
						this.state.computerOverallScore
				)
				let currentItemsValueDiff =
					this.state.itemsCurrent[0].value -
					this.state.itemsCurrent[1].value
				let lastCardInLine = () => {
					if (this.state.lineCards.length > 0) {
						return this.state.lineCards[
							this.state.lineCards.length - 1
						]
					}
				}

				let hasFourPointCards,
					hasWeakerCards,
					hasStrongerCards,
					hasNurse,
					hasSmoker,
					hasKid,
					hasLady

				if (hasCardsInHand) {
					hasFourPointCards = _.findIndex(this.state.handComputer, {
						value: 4
					})
					hasWeakerCards = _.findIndex(
						this.state.handComputer,
						function (o) {
							return o.value === 1
						}
					)
					hasStrongerCards = _.findIndex(
						this.state.handComputer,
						function (o) {
							return o.value > 1
						}
					)
					hasNurse = _.findIndex(this.state.handComputer, {
						name: "pielegniarka"
					})
					hasSmoker = _.findIndex(this.state.handComputer, {
						name: "palacz"
					})
					hasKid = _.findIndex(this.state.handComputer, {
						name: "dzieciak"
					})
					hasLady = _.findIndex(this.state.handComputer, {
						name: "baba"
					})
				}

				let drawConditions = () => {
					if (hasNoCardsInHand && hasCardsInDeck) {
						console.log("ai pulls a card: no cards")

						return true
					} else if (
						hasCardsInHand &&
						hasLessThan5CardsInHand &&
						hasCardsInDeck &&
						isLastTurn &&
						computerTurnScore > playerTurnScore
					) {
						console.log(
							"ai pulls a card: it's the last turn and the ai is already winning"
						)
						return true
					} else if (
						hasCardsInHand &&
						hasLessThan5CardsInHand &&
						hasCardsInDeck &&
						isLastTurn &&
						turnScoreDiff >= 2 &&
						hasFourPointCards === -1
					) {
						console.log(
							"ai pulls a card: player has x >= 2 point advantage in this turn and ai does nott have 4 point cards"
						)

						return true
					} else if (
						hasCardsInHand &&
						hasLessThan5CardsInHand &&
						hasCardsInDeck &&
						isLastTurn &&
						turnScoreDiff > 1 &&
						hasStrongerCards === -1
					) {
						console.log(
							"ai pulls a card: player has x > 1 point advantage in this turn and ai doesn't have stronger point cards"
						)

						return true
					} else if (
						hasLessThan5CardsInHand &&
						hasCardsInDeck &&
						computerTurnScore - playerTurnScore > 3 &&
						currentItemsValueDiff < 3
					) {
						console.log(
							"ai pulls a card: the ai leads, so there is no point in putting more cards and the items are similar in value"
						)

						return true
					} else if (
						hasCardsInHand &&
						hasLessThan5CardsInHand &&
						hasCardsInDeck &&
						lastCardInLine() !== undefined &&
						lastCardInLine().name === "palacz" &&
						hasStrongerCards === -1 &&
						hasNurse === -1 &&
						hasSmoker === -1
					) {
						console.log(
							"ai pulls a card: the latest card in line is the smoker and the ai doesn't have a smoker, a nurse or a high value card"
						)

						return true
					} else if (
						hasCardsInHand &&
						hasLessThan5CardsInHand &&
						hasCardsInDeck &&
						isLastTurn &&
						((hasFourPointCards &&
							computerTurnScore + 4 < playerTurnScore) ||
							(hasStrongerCards &&
								computerTurnScore + 2 < playerTurnScore) ||
							(hasWeakerCards &&
								computerTurnScore + 1 < playerTurnScore))
					) {
						console.log(
							"ai pulls a card: the latest card in line is the smoker it's the last turn and adding a card won't make a difference"
						)

						return true
					} else {
						return false
					}
				}

				if (drawConditions()) {
					this.setState(
						{
							computerDrawsCard: true
						},
						() => {
							this.setState(
								{
									phaseThreeFlag: false,
									computerThinking: true
								},
								() => {
									setTimeout(() => {
										if (this.state.computerDrawsCard) {
											let deckComputerCopy = [
												...this.state.deckComputer
											]
											let drawnCard = deckComputerCopy.splice(
												this.state.deckPlayer.length -
													1,
												1
											)[0]

											let handComputerCopy = [
												...this.state.handComputer,
												drawnCard
											]

											this.setState(prevState => ({
												deckComputer: deckComputerCopy,
												handComputer: handComputerCopy,
												cardsDeckLeftComputer:
													prevState.cardsDeckLeftComputer -
													1,
												phaseTwoFlag: true,
												phaseThreeFlag: true,
												currentPhase: 1,
												turnCounter:
													prevState.turnCounter + 1,
												computerThinking: false,
												computerDrawsCard: false
											}))
										}
									}, 1000)
								}
							)
						}
					)
				} else if (!this.state.computerDrawsCard) {
					let computerChosenCard = ""
					let lastCardInLine = this.state.lineCards[
						this.state.lineCards.length - 1
					]
					let beforeLastCardInLine = this.state.lineCards[
						this.state.lineCards.length - 2
					]

					// last turn and player has 4 > x >= 2 point advantage, but
					// ai has 4 point cards
					if (
						hasCardsInHand &&
						turnScoreDiff >= 2 &&
						turnScoreDiff < 4 &&
						isLastTurn &&
						hasFourPointCards > -1
					) {
						let handComputerCopy = [...this.state.handComputer]
						computerChosenCard = handComputerCopy.splice(
							hasFourPointCards,
							1
						)

						this.setState({
							handComputer: handComputerCopy
						})

						console.log(
							"ai: player is leading, but I have a valuable card to turn the tide"
						)
					}

					// no cards in line, it's the last turn, so use weakest
					else if (
						hasCardsInHand &&
						this.state.lineCards.length === 0 &&
						!hasNoCardsInHand &&
						(hasKid > -1 || hasSmoker > -1 || hasNurse > -1)
					) {
						if (hasKid > -1) {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasKid,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						} else if (hasSmoker > -1) {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasSmoker,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						} else {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasNurse,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						}

						console.log(
							"no cards in line, so just using weakest, to win"
						)
					}

					// if the before last card belongs to the ai
					// and is a 4-point card and the last one is the smoker belonging
					// to the player - use the nurse
					else if (
						this.state.lineCards.length > 1 &&
						lastCardInLine !== undefined &&
						beforeLastCardInLine !== undefined &&
						beforeLastCardInLine.name === "partyjniak" &&
						beforeLastCardInLine.source === "deckComputer" &&
						lastCardInLine.name === "palacz" &&
						lastCardInLine.source === "deckPlayer" &&
						hasCardsInHand &&
						hasNurse > -1
					) {
						let handComputerCopy = [...this.state.handComputer]
						computerChosenCard = handComputerCopy.splice(
							hasNurse,
							1
						)

						this.setState({
							handComputer: handComputerCopy
						})

						console.log("ai: protect mode")
					}

					// difference of current items value is less than 3 and
					// the ai has a similar overall score, so use low value cards
					else if (
						hasCardsInHand &&
						currentItemsValueDiff < 3 &&
						itemsScoreDiff < 4 &&
						lastCardInLine !== undefined &&
						lastCardInLine.name === "palacz" &&
						(hasSmoker > -1 || hasLady > -1 || hasNurse > -1)
					) {
						if (hasSmoker > -1) {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasSmoker,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						} else if (hasNurse > -1) {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasNurse,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						} else {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasLady,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						}

						console.log(
							"ai: diff of item value is small but I have to use a card, so it will be weak"
						)
					}

					// similar to above, but there is no smoker in the end
					// difference of current items value is less than 3 and
					// the ai has a similar overall score, so use low value cards
					else if (
						hasCardsInHand &&
						currentItemsValueDiff < 3 &&
						itemsScoreDiff < 4 &&
						lastCardInLine !== undefined &&
						lastCardInLine.name === "palacz" &&
						(hasSmoker > -1 || hasKid > -1 || hasNurse > -1)
					) {
						if (hasSmoker > -1) {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasSmoker,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						} else if (hasKid > -1) {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasKid,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						} else {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasNurse,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						}

						console.log(
							"ai: diff of item value is small but I have to use a card, so it will be weak"
						)
					}

					// last card belongs to the player
					// and is a 4-point card then use the smoker
					else if (
						this.state.lineCards.length > 0 &&
						lastCardInLine !== undefined &&
						lastCardInLine.name === "partyjniak" &&
						lastCardInLine.source === "deckPlayer" &&
						hasCardsInHand &&
						hasSmoker > -1
					) {
						let handComputerCopy = [...this.state.handComputer]
						computerChosenCard = handComputerCopy.splice(
							hasSmoker,
							1
						)

						this.setState({
							handComputer: handComputerCopy
						})
						console.log("ai: attack mode")
					}

					// the latest card in line is the smoker
					// and the ai has a smoker, a nurse or high value card
					else if (
						hasCardsInHand &&
						lastCardInLine !== undefined &&
						lastCardInLine.name === "palacz" &&
						(hasFourPointCards > -1 ||
							hasStrongerCards > -1 ||
							hasNurse > -1 ||
							hasSmoker > -1)
					) {
						if (hasNurse > -1) {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasNurse,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						} else if (hasSmoker > -1) {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasSmoker,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						} else if (hasFourPointCards > -1) {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasFourPointCards,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						} else {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasStrongerCards,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						}

						console.log(
							"ai: trying to block or score upon last card smoker"
						)
					}
					// the item is valuable, use strong cards
					else if (
						hasCardsInHand &&
						(this.state.itemsCurrent[0].value > 4 ||
							this.state.itemsCurrent[1].value > 4) &&
						(hasFourPointCards > -1 ||
							hasStrongerCards > -1 ||
							hasSmoker > -1)
					) {
						if (hasFourPointCards > -1) {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasFourPointCards,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						} else if (hasStrongerCards > -1) {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasStrongerCards,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						} else {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasSmoker,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						}

						console.log(
							"ai: trying to use strong cards, because one item has value"
						)
					}

					// it's the last turn and it's a draw and there is no smoker in the end
					// the ai needs to use a weak card to win
					else if (
						isLastTurn &&
						playerTurnScore === computerTurnScore &&
						lastCardInLine !== undefined &&
						lastCardInLine.name !== "palacz" &&
						hasWeakerCards
					) {
						let handComputerCopy = [...this.state.handComputer]
						computerChosenCard = handComputerCopy.splice(
							hasWeakerCards,
							1
						)

						this.setState({
							handComputer: handComputerCopy
						})
					}

					// it's the last turn and it's a draw and there is a smoker in the end
					// the ai needs to use a stronger card to win
					else if (
						isLastTurn &&
						playerTurnScore === computerTurnScore &&
						lastCardInLine !== undefined &&
						lastCardInLine.name === "palacz" &&
						hasStrongerCards
					) {
						let handComputerCopy = [...this.state.handComputer]
						computerChosenCard = handComputerCopy.splice(
							hasStrongerCards,
							1
						)

						this.setState({
							handComputer: handComputerCopy
						})
					}

					// it's the last turn and it's almost a win for the ai
					// and there is no smoker in the end
					// the ai needs to use a stronger card to win
					else if (
						isLastTurn &&
						playerTurnScore - computerTurnScore === 1 &&
						lastCardInLine !== undefined &&
						lastCardInLine.name !== "palacz" &&
						hasStrongerCards
					) {
						let handComputerCopy = [...this.state.handComputer]
						computerChosenCard = handComputerCopy.splice(
							hasStrongerCards,
							1
						)

						this.setState({
							handComputer: handComputerCopy
						})
					}

					// it's the last turn and it's almost a win for the ai
					// and it's worth fighting for the items
					// and there is a smoker in the end
					// the ai needs to use the strongest card to win
					else if (
						isLastTurn &&
						playerTurnScore - computerTurnScore === 1 &&
						currentItemsValueDiff > 2 &&
						lastCardInLine !== undefined &&
						lastCardInLine.name === "palacz" &&
						hasFourPointCards
					) {
						let handComputerCopy = [...this.state.handComputer]
						computerChosenCard = handComputerCopy.splice(
							hasFourPointCards,
							1
						)

						this.setState({
							handComputer: handComputerCopy
						})
					}

					// there is a significant difference between items values,
					// so use strongest cards
					else if (currentItemsValueDiff > 2) {
						if (hasFourPointCards > -1) {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasFourPointCards,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						} else if (hasStrongerCards > -1) {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasStrongerCards,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						} else {
							let handComputerCopy = [...this.state.handComputer]
							computerChosenCard = handComputerCopy.splice(
								hasSmoker,
								1
							)

							this.setState({
								handComputer: handComputerCopy
							})
						}

						console.log(
							"ai: trying to use strong cards, because one item has value and the other is weak"
						)
					} else {
						// delete first card from computer hand
						let handComputerCopy = [...this.state.handComputer]
						computerChosenCard = handComputerCopy.splice(0, 1)

						this.setState({
							handComputer: handComputerCopy
						})

						console.log("ai: deleting first card in hand")
					}

					let lineCardsCopy = [
						...this.state.lineCards,
						...computerChosenCard
					]

					setTimeout(() => {
						this.setState(
							{
								currentPhase: 3,
								lineCards: lineCardsCopy
							},
							() => {
								console.log("card sent to line by computer")

								// updating the scores for computer
								this.setState(
									prevState => ({
										computerScore:
											prevState.computerScore +
											computerChosenCard[0].value
									}),
									() => {
										this.setState(
											prevState => ({
												phaseTwoFlag: true,
												phaseThreeFlag: true,
												currentPhase: 1,
												turnCounter:
													prevState.turnCounter + 1,
												computerThinking: false
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
					}, 1000)
				}
			}
		)
	}

	distributeItems = () => {
		console.log("giving items to the winner")
		this.setState(
			prevState => ({
				noClicking: false,
				itemsScreenFlag: false,
				turnCounter: 0,
				phaseOneFlag: false,
				currentPhase: 1,
				playerScore: prevState.playerScore - this.state.playerPenalty,
				computerScore:
					prevState.computerScore - this.state.computerPenalty,
				playerPenalty: 0,
				computerPenalty: 0
			}),
			() => {
				if (this.state.playerScore > this.state.computerScore) {
					console.log("giving items to player")

					this.setState(
						{
							showItemsScreen: true,
							itemsScreenFlag: true,
							playerScore: 0,
							computerScore: 0
						},
						() => {
							this.setState(
								prevState => ({
									playerItems: [
										...prevState.playerItems,
										this.state.itemsCurrent[0]
									],
									playerOverallScore:
										prevState.playerOverallScore +
										this.state.itemsCurrent[0].value,
									itemPlayerMsg: `You got a ${this.state.itemsCurrent[0].name}`,
									computerItems: [
										...prevState.computerItems,
										this.state.itemsCurrent[1]
									],
									computerOverallScore:
										prevState.computerOverallScore +
										this.state.itemsCurrent[1].value,
									itemComputerMsg: `The AI got a ${this.state.itemsCurrent[1].name}`,
									lineCards: []
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
							computerScore: 0
						},
						() => {
							this.setState(
								prevState => ({
									playerItems: [
										...prevState.playerItems,
										this.state.itemsCurrent[1]
									],
									playerOverallScore:
										prevState.playerOverallScore +
										this.state.itemsCurrent[1].value,
									itemPlayerMsg: `You got a ${this.state.itemsCurrent[1].name}`,
									computerItems: [
										...prevState.computerItems,
										this.state.itemsCurrent[0]
									],
									computerOverallScore:
										prevState.computerOverallScore +
										this.state.itemsCurrent[0].value,
									itemComputerMsg: `The AI got a ${this.state.itemsCurrent[0].name}`,
									lineCards: []
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
							itemComputerMsg: ""
						},
						() => {
							this.setState({
								lineCards: []
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
				computerFinalScore: this.state.computerOverallScore
			},
			() => {
				console.log(
					`Final scores: player - ${this.state.playerFinalScore}, AI - ${this.state.computerFinalScore}`
				)
				// reset state
				this.setState(
					{
						deckPlayer: [...deckStats, ...deckStats2],
						deckComputer: [...deckStats, ...deckStats3],
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
						itemsScreenFlag: true
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
							lineCards: [...lineCardsCopy]
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
							lineCards: [...lineCardsCopy]
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
						lineCards: [...lineCardsCopy]
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
						lineCards: [...lineCardsCopy]
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
						lineCards: [...lineCardsCopy]
					})
				}
			}
		})
	}

	applyPenalty = () => {
		let playerCards = [
			...this.state.lineCards.filter(el => el.source === "deckPlayer")
		]
		let playerPenalty = 0
		playerCards.forEach(el => {
			if (!!el.effect && (el.effect === -1 || el.effect === -2)) {
				playerPenalty -= el.effect
			}
		})

		let computerCards = [
			...this.state.lineCards.filter(el => el.source === "deckComputer")
		]
		let computerPenalty = 0
		computerCards.forEach(el => {
			if (!!el.effect && (el.effect === -1 || el.effect === -2)) {
				computerPenalty -= el.effect
			}
		})

		this.setState({
			playerPenalty: playerPenalty,
			computerPenalty: computerPenalty
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

				{this.state.showSmallWidthScreen && (
					<SmallWidthScreen
						showWelcomeScreen={this.state.showWelcomeScreen}
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
						playerItems={this.state.playerItems}
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
