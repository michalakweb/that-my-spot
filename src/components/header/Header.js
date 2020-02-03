import React from "react";
import Logo from "./Logo";
import GameInfo from "./GameInfo";
import LangSettings from "./LangSettings";

const Header = () => (
  <div id="header">
    <Logo />
    <GameInfo />
    <LangSettings />
  </div>
);

export default Header;
