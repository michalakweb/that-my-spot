import React from "react"

const ExtraInfo = props => (
  <div id="extra_info">
    {props.cardsDeckLeftPlayer && (
      <button
        disabled={props.currentPhase === 1 && props.handPlayer.length === 5}
        onClick={() => {
          props.drawCard()
        }}
      >
        Draw card
      </button>
    )}
  </div>
)

export default ExtraInfo
