import React from "react"
import ItemContainer from "./ItemContainer"
import LineContainer from "./LineContainer"

const Body = props => (
  <div id="body">
    <ItemContainer itemsCurrent={props.itemsCurrent} />
    <LineContainer />
  </div>
)

export default Body
