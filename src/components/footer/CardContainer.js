import React from "react"
import Card from "./Card"

const CardContainer = props => (
  <div id="card_container">
    {props.deckPlayer.map((el, id) => (
      <Card cardInfo={el} key={id} />
    ))}
  </div>
)

export default CardContainer
