import React from "react"
import Item from "./Item"

const ItemContainer = props => (
  <div id="item_container">
    {props.itemsCurrent.map((el, id) => (
      <Item item={el} key={id} />
    ))}
  </div>
)

export default ItemContainer
