import React from "react"
import LineCard from "./LineCard"
import LineSpotDiv from "./LineSpotDiv"

const LineSpot = props => (
  <div className="line_spot">
    <LineCard lineCard={props.lineCard} />
    <LineSpotDiv />
  </div>
)

export default LineSpot
