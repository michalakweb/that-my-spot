import React from "react"

const LineSpotDiv = props => (
  <div
    className={
      props.lineCardSource === "deckComputer"
        ? "line_spot_div_ai"
        : "line_spot_div_pl"
    }
  ></div>
)

export default LineSpotDiv
