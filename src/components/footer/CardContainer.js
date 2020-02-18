import React from "react"
import Card from "./Card"

const CardContainer = props => (
  <div id="card_container">
    {props.deckPlayer.map((el, id) => (
      <Card
        cardInfo={el}
        key={id}
        selectCard={props.selectCard}
        position={id}
      />
    ))}
  </div>
)

export default CardContainer
