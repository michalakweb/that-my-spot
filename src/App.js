import React from "react";
import "./App.scss";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import Footer from "./components/footer/Footer";

function App() {
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

export default App;
