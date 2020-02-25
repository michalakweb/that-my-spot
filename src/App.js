import React from "react"
import "./App.scss"
import Header from "./components/header/Header"
import Body from "./components/body/Body"
import Footer from "./components/footer/Footer"
import WelcomeScreen from "./components/WelcomeScreen"
import ItemScreen from "./components/ItemScreen"

// Deck & Items db
const deckStats = [
  { id: 1, name: "jozek", value: 1 },
  { id: 2, name: "baba", value: 2 },
  { id: 3, name: "dzieciak", value: 1 },
  { id: 4, name: "palacz", value: 1 },
  { id: 5, name: "partyjniak", value: 4 }
]
const itemStats = [
  { id: 1, name: "rower", value: 5 },
  { id: 2, name: "telefon", value: 10 },
  { id: 3, name: "krem", value: 3 },
  { id: 4, name: "papier", value: 3 },
  { id: 5, name: "ocet", value: 1 },
  { id: 6, name: "piwo", value: 2 },
  { id: 7, name: "plaszcz", value: 8 },
  { id: 8, name: "konsola", value: 12 },
  { id: 9, name: "kawa", value: 3 },
  { id: 10, name: "kredki", value: 1 },
  { id: 11, name: "opona", value: 4 },
  { id: 12, name: "ksiazka", value: 3 }
]

class App extends React.Component {
  state = {
    // Game info
    deckPlayer: [...deckStats, ...deckStats],
    deckComputer: [...deckStats, ...deckStats],
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

    // Messages
    itemPlayerMsg: "",
    itemComputerMsg: "",
    itemDrawMsg: "It was a draw. Nobody gets anything.",

    // Phase tracking
    currentPhase: 0,
    turnCounter: 0,

    // Scores
    playerScore: 0,
    computerScore: 0,
    playerOverallScore: 0,
    computerOverallScore: 0,

    // Settings
    currentLanguage: "en",
    phaseOneFlag: true,
    phaseTwoFlag: true,
    phaseThreeFlag: true,

    // Modals
    showWelcomeScreen: true,
    showWinLoseScreen: false,
    showItemsScreen: false,
    itemsScreenFlag: true
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
          currentPhase: 1
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

    // computer move
    if (this.state.phaseThreeFlag && this.state.currentPhase === 2) {
      this.sendCardToLineComputer()
    }

    // six turns - time for items
    if (this.state.turnCounter === 6 && this.state.itemsScreenFlag) {
      this.distributeItems()
    }

    // finish game conditions
    if (
      (this.state.deckComputer.length === 0 &&
        this.state.handComputer.length === 0) ||
      (this.state.deckPlayer.length === 0 && this.state.handPlayer.length === 0)
    ) {
      console.log("someone ran out of cards")
    }
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

  shuffleItems = array => {
    let arr = [...array]
    console.log("shuffling items")
    var j, x, i
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      x = arr[i]
      arr[i] = arr[j]
      arr[j] = x
    }
    this.setState(
      {
        items: [...arr]
      },
      () => {
        this.drawItemsFromDeck([...arr])
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
      turnCounter: prevState.turnCounter + 1
    }))
  }

  selectCard = (cardInfo, position) => {
    if (this.state.currentPhase === 1) {
      console.log("the selected card is:", cardInfo)

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
        lineCards: [...this.state.lineCards, JSON.parse(this.state.chosenCard)]
      }),
      () => {
        console.log("card sent to line by player")

        // updating the scores for player
        this.setState(
          prevState => ({
            playerScore: prevState.playerScore + playerChosenCard.value
          }),
          () => {
            this.setState(prevState => ({
              turnCounter: prevState.turnCounter + 1
            }))
          }
        )
      }
    )
  }

  sendCardToLineComputer = () => {
    this.setState(
      {
        phaseThreeFlag: false
      },
      () => {
        console.log("computer move")

        // no cards left, so has to draw one

        if (this.state.handComputer.length === 0) {
          console.log("computer draws a card")

          let drawnCard = this.state.deckComputer.splice(
            this.state.deckPlayer.length - 1,
            1
          )[0]

          this.setState(prevState => ({
            handComputer: [...this.state.handComputer, drawnCard],
            cardsDeckLeftComputer: prevState.cardsDeckLeftComputer - 1,
            phaseTwoFlag: true,
            phaseThreeFlag: true,
            currentPhase: 1,
            turnCounter: prevState.turnCounter + 1
          }))
        } else {
          // delete first card from computer hand
          let computerChosenCard = this.state.handComputer.splice(0, 1)

          this.setState(
            prevState => ({
              currentPhase: 3,
              lineCards: [...this.state.lineCards, ...computerChosenCard]
            }),
            () => {
              console.log("card sent to line by computer")

              // updating the scores for computer
              this.setState(
                prevState => ({
                  computerScore:
                    prevState.computerScore + computerChosenCard[0].value
                }),
                () => {
                  this.setState(prevState => ({
                    phaseTwoFlag: true,
                    phaseThreeFlag: true,
                    currentPhase: 1,
                    turnCounter: prevState.turnCounter + 1
                  }))
                }
              )
            }
          )
        }
      }
    )
  }

  distributeItems = () => {
    console.log("giving items to the winner")
    this.setState(
      {
        itemsScreenFlag: false,
        turnCounter: 0,
        phaseOneFlag: false,
        currentPhase: 1
      },
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

  render() {
    return (
      <div>
        {/* Uncomment to show welcome screen */}
        {/* {this.state.showWelcomeScreen && (
          <WelcomeScreen switchWelcomeScreen={this.switchWelcomeScreen} />
        )} */}

        {this.state.showItemsScreen && (
          <ItemScreen
            switchItemsScreen={this.switchItemsScreen}
            itemPlayerMsg={this.state.itemPlayerMsg}
            itemComputerMsg={this.state.itemComputerMsg}
          />
        )}

        <div id="container">
          <div id="flex-container">
            <Header
              turnCounter={this.state.turnCounter}
              playerScore={this.state.playerScore}
              computerScore={this.state.computerScore}
            />

            <Body
              itemsCurrent={this.state.itemsCurrent}
              lineCards={this.state.lineCards}
            />

            <Footer
              handPlayer={this.state.handPlayer}
              cardsDeckLeftPlayer={this.state.cardsDeckLeftPlayer}
              selectCard={this.selectCard}
              playerOverallScore={this.state.playerOverallScore}
              computerOverallScore={this.state.computerOverallScore}
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
