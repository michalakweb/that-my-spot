import React from "react"
import LineSpot from "./LineSpot"

const LineContainer = props => (
  <div id="line_container">
    {props.lineCards.length > 0 &&
      props.lineCards.map((el, id) => <LineSpot key={id} lineCard={el} />)}
  </div>
)

export default LineContainer
