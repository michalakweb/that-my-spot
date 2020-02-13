import React from "react"

const Item = props => (
  <div className="item">
    {props.item.name}
    {props.item.value}
  </div>
)

export default Item
