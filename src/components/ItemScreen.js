import React from "react"

const ItemScreen = props => (
  <div id="welcome_screen">
    <div id="welcome_logo">
      <p>{props.itemPlayerMsg}</p>
      <p>{props.itemComputerMsg}</p>
      {props.itemPlayerMsg === "" && props.itemComputerMsg === "" && (
        <p>A draw - nobody gets anything</p>
      )}
    </div>
    <div id="button_container">
      <button
        onClick={() => {
          props.switchItemsScreen()
        }}
      >
        Ok
      </button>
    </div>
  </div>
)

export default ItemScreen
