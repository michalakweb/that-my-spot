import React from "react"
import "./App.scss"
import _ from "lodash"
import Header from "./components/header/Header"
import Body from "./components/body/Body"
import Footer from "./components/footer/Footer"
import WelcomeScreen from "./components/WelcomeScreen"
import ItemScreen from "./components/ItemScreen"
import WinLoseScreen from "./components/WinLoseScreen"
import SmallWidthScreen from "./components/SmallWidthScreen"
import TutorialScreen from "./components/TutorialScreen"

// cards and items
import { deckStats, deckStats2, deckStats3, itemStats } from "./cardsAndItems"

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
		showTutorialScreen: false,

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
					console.error("EMERGENCY", this.state)
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

	switchTutorialScreen = () => {
		this.setState(prevState => ({
			showTutorialScreen: !prevState.showTutorialScreen
		}))
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

	shuffleCards = (cards, stateName) => {
		// add source for card sets
		let cardsShuffled = [...cards].map(obj => ({
			...obj,
			source: stateName
		}))

		console.log(`shuffling cards for ${stateName}`)
		let j, x, i
		for (i = cardsShuffled.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1))
			x = cardsShuffled[i]
			cardsShuffled[i] = cardsShuffled[j]
			cardsShuffled[j] = x
		}

		this.setState(
			{
				[stateName]: [...cardsShuffled]
			},
			() => {
				this.drawCardsFromDeck([...cardsShuffled], stateName)
			}
		)
	}

	drawItemsFromDeck = array => {
		console.log("drawing items")

		let itemsCurrent = array.splice(-2, 2)
		itemsCurrent.sort((a, b) => b.value - a.value)

		this.setState(
			{
				items: array,
				itemsCurrent: itemsCurrent
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

		let currentHand = array.splice(-5, 5)

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

		let deckPlayerCopy = [...this.state.deckPlayer]

		let drawnCard = deckPlayerCopy.splice(deckPlayerCopy.length - 1, 1)[0]

		this.setState(prevState => ({
			deckPlayer: deckPlayerCopy,
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
		let handPlayerCopy = [...this.state.handPlayer]

		let playerChosenCard = handPlayerCopy.splice(
			this.state.chosenCardPosition,
			1
		)[0]

		this.setState(
			prevState => ({
				handPlayer: handPlayerCopy,
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
												deckComputerCopy.length - 1,
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
					let handComputerCopy = [...this.state.handComputer]

					// last turn and player has 4 > x >= 2 point advantage, but
					// ai has 4 point cards
					if (
						hasCardsInHand &&
						turnScoreDiff >= 2 &&
						turnScoreDiff < 4 &&
						isLastTurn &&
						hasFourPointCards > -1
					) {
						computerChosenCard = handComputerCopy.splice(
							hasFourPointCards,
							1
						)

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
							computerChosenCard = handComputerCopy.splice(
								hasKid,
								1
							)
						} else if (hasSmoker > -1) {
							computerChosenCard = handComputerCopy.splice(
								hasSmoker,
								1
							)
						} else {
							computerChosenCard = handComputerCopy.splice(
								hasNurse,
								1
							)
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
						computerChosenCard = handComputerCopy.splice(
							hasNurse,
							1
						)

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
							computerChosenCard = handComputerCopy.splice(
								hasSmoker,
								1
							)
						} else if (hasNurse > -1) {
							computerChosenCard = handComputerCopy.splice(
								hasNurse,
								1
							)
						} else {
							computerChosenCard = handComputerCopy.splice(
								hasLady,
								1
							)
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
							computerChosenCard = handComputerCopy.splice(
								hasSmoker,
								1
							)
						} else if (hasKid > -1) {
							computerChosenCard = handComputerCopy.splice(
								hasKid,
								1
							)
						} else {
							computerChosenCard = handComputerCopy.splice(
								hasNurse,
								1
							)
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
						computerChosenCard = handComputerCopy.splice(
							hasSmoker,
							1
						)

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
							computerChosenCard = handComputerCopy.splice(
								hasNurse,
								1
							)
						} else if (hasSmoker > -1) {
							computerChosenCard = handComputerCopy.splice(
								hasSmoker,
								1
							)
						} else if (hasFourPointCards > -1) {
							computerChosenCard = handComputerCopy.splice(
								hasFourPointCards,
								1
							)
						} else {
							computerChosenCard = handComputerCopy.splice(
								hasStrongerCards,
								1
							)
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
							computerChosenCard = handComputerCopy.splice(
								hasFourPointCards,
								1
							)
						} else if (hasStrongerCards > -1) {
							computerChosenCard = handComputerCopy.splice(
								hasStrongerCards,
								1
							)
						} else {
							computerChosenCard = handComputerCopy.splice(
								hasSmoker,
								1
							)
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
						computerChosenCard = handComputerCopy.splice(
							hasWeakerCards,
							1
						)
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
						computerChosenCard = handComputerCopy.splice(
							hasStrongerCards,
							1
						)
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
						computerChosenCard = handComputerCopy.splice(
							hasStrongerCards,
							1
						)
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
						computerChosenCard = handComputerCopy.splice(
							hasFourPointCards,
							1
						)
					}

					// there is a significant difference between items values,
					// so use strongest cards
					else if (currentItemsValueDiff > 2) {
						if (hasFourPointCards > -1) {
							computerChosenCard = handComputerCopy.splice(
								hasFourPointCards,
								1
							)
						} else if (hasStrongerCards > -1) {
							computerChosenCard = handComputerCopy.splice(
								hasStrongerCards,
								1
							)
						} else {
							computerChosenCard = handComputerCopy.splice(
								hasSmoker,
								1
							)
						}

						console.log(
							"ai: trying to use strong cards, because one item has value and the other is weak"
						)
					} else {
						// delete first card from computer hand
						computerChosenCard = handComputerCopy.splice(0, 1)

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
								lineCards: lineCardsCopy,
								handComputer: handComputerCopy
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

				{this.state.showTutorialScreen && (
					<TutorialScreen
						switchTutorialScreen={this.switchTutorialScreen}
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
							switchTutorialScreen={this.switchTutorialScreen}
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
