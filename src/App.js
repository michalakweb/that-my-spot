import React from "react";
import "./App.scss";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import Footer from "./components/footer/Footer";
import WelcomeScreen from "./components/WelcomeScreen";

// Deck & Items db
const deckStats = [
  { id: 1, name: "jozek", value: 1 },
  { id: 2, name: "baba", value: 2 },
  { id: 3, name: "dzieciak", value: 1 },
  { id: 4, name: "palacz", value: 1 },
  { id: 5, name: "partyjniak", value: 4 }
];
const itemStats = [
  { id: 1, name: "rower", value: 5 },
  { id: 2, name: "telefon", value: 10 },
  { id: 3, name: "krem", value: 3 },
  { id: 4, name: "papier", value: 3 },
  { id: 5, name: "ocet", value: 1 }
];

class App extends React.Component {
  state = {
    // Game info
    deckPlayer: JSON.parse(JSON.stringify(deckStats)),
    deckComputer: JSON.parse(JSON.stringify(deckStats)),
    currentItems: [],
    playerItems: 0,
    computerItems: 0,
    lineCards: [],
    drawnCardPlayer: null,
    drawnCardComputer: null,
    chosenCard: null,
    lineStats: null,

    // Phase tracking
    currentPhase: 0,
    phaseCounter: 0,

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
  };

  componentDidMount() {}

  switchWelcomeScreen = () => {
    this.setState({
      showWelcomeScreen: false
    });
  };

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

            <Body />

            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
