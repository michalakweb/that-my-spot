import React from "react"
import OverallScore from "./OverallScore"
import CardContainer from "./CardContainer"
import ExtraInfo from "./ExtraInfo"

const Footer = props => (
  <div id="footer">
    <OverallScore />
    <CardContainer deckPlayer={props.deckPlayer} selectCard={props.selectCard} />
    <ExtraInfo />
  </div>
)

export default Footer
