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
    let arr = [...array]
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

            <Body itemsCurrent={this.state.itemsCurrent} />

            <Footer deckPlayer={this.state.deckPlayer} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
