import React from "react";
import Logo from "./logo";
import GameInfo from "./gameInfo";
import LangSettings from "./langSettings";

const Header = () => (
  <div id="header">
    <Logo />
    <GameInfo />
    <LangSettings />
  </div>
);

export default Header;
