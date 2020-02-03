import React from "react";
import "./App.scss";

// Components
import Header from "./components/header/Header";
import Body from "./components/body/Body";

function App() {
  return (
    <div id="container">
      <div id="flex-container">
        <Header />

        <Body />

        <div id="footer">
          <div className="overall_score">Overall score</div>

          <div className="card_container">
            <div className="card">card</div>
            <div className="card">card</div>
            <div className="card">card</div>
            <div className="card">card</div>
            <div className="card">card</div>
          </div>

          <div className="egmont_logo">info</div>
        </div>
      </div>
    </div>
  );
}

export default App;
