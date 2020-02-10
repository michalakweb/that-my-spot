import React from "react";
import "./App.scss";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import Footer from "./components/footer/Footer";

// Deck & Items db
const deckStats = [{ id: 1 }, { id: 2 }];
// const itemStats = [{ id: 1 }, { id: 2 }];

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
    showWelcomeScreen: false,
    showWinLoseScreen: false,
    showItemsScreen: false
  };

  render() {
    return (
      <div id="container">
        <div id="flex-container">
          <Header />

          <Body />

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
