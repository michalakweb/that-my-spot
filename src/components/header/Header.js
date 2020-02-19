import React from "react"
import Logo from "./Logo"
import GameInfo from "./GameInfo"
import LangSettings from "./LangSettings"

const Header = props => (
  <div id="header">
    <Logo />
    <GameInfo
      turnCounter={props.turnCounter}
      playerScore={props.playerScore}
      computerScore={props.computerScore}
    />
    <LangSettings />
  </div>
)

export default Header
