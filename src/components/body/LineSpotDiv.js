import React from "react"

const LineSpotDiv = props => (
  <div className="line_spot_div">
    {props.lineCardSource === "deckComputer" ? "ai" : "pl"}
  </div>
)

export default LineSpotDiv
