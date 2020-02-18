import React from "react"
import "./App.scss"
import Header from "./components/header/Header"
import Body from "./components/body/Body"
import Footer from "./components/footer/Footer"
import WelcomeScreen from "./components/WelcomeScreen"

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
  { id: 5, name: "ocet", value: 1 }
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
    playerItems: 0,
    computerItems: 0,
    lineCards: [],
    drawnCardPlayer: [],
    drawnCardComputer: [],
    chosenCard: null,
    chosenCardPosition: null,
    chosenCardConfirm: null,
    lineStats: null,
    cardsDeckLeftPlayer: 10,
    cardsDeckLeftComputer: 10,

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
    showItemsScreen: false
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
      this.setState(
        {
          phaseThreeFlag: false
        },
        () => {
          console.log("computer move")

          // delete first card from computer deck
          let computerChosenCard = this.state.deckComputer.splice(0, 1)

          this.setState(
            prevState => ({
              currentPhase: 3,
              lineCards: [...this.state.lineCards, ...computerChosenCard],
              turnCounter: prevState.turnCounter + 1
            }),
            () => {
              console.log("card sent to line by computer")

              // updating the scores for player
              this.setState(
                {
                  computerScore: this.state.lineCards
                    .filter(el => el.source === "deckComputer")
                    .reduce(function(a, b) {
                      return a + b["value"]
                    }, 0)
                },
                () => {
                  this.setState(prevState => ({
                    computerOverallScore:
                      prevState.computerOverallScore + this.state.computerScore
                  }))
                }
              )
            }
          )
        }
      )
    }
  }

  switchWelcomeScreen = () => {
    this.setState({
      showWelcomeScreen: false
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
    this.state.deckPlayer.splice(this.state.chosenCardPosition, 1)

    this.setState(
      prevState => ({
        phaseTwoFlag: false,
        currentPhase: 2,
        chosenCard: null,
        chosenCardConfirm: null,
        chosenCardPosition: null,
        lineCards: [...this.state.lineCards, JSON.parse(this.state.chosenCard)],
        turnCounter: prevState.turnCounter + 1
      }),
      () => {
        console.log("card sent to line by player")

        // updating the scores for player
        this.setState(
          {
            playerScore: this.state.lineCards
              .filter(el => el.source === "deckPlayer")
              .reduce(function(a, b) {
                return a + b["value"]
              }, 0)
          },
          () => {
            this.setState(prevState => ({
              playerOverallScore:
                prevState.playerOverallScore + this.state.playerScore
            }))
          }
        )
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

        <div id="container">
          <div id="flex-container">
            <Header />

            <Body
              itemsCurrent={this.state.itemsCurrent}
              lineCards={this.state.lineCards}
            />

            <Footer
              deckPlayer={this.state.deckPlayer}
              selectCard={this.selectCard}
              playerOverallScore={this.state.playerOverallScore}
              computerOverallScore={this.state.computerOverallScore}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
