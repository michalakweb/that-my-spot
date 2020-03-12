import React from "react"

const ExtraInfo = props => (
  <div id="extra_info">
    {props.cardsDeckLeftPlayer > 0 ? (
      <button
        disabled={props.currentPhase === 1 && props.handPlayer.length === 5}
        onClick={() => {
          props.drawCard()
        }}
      >
        Draw card
      </button>
    ) : (
      ""
    )}
    <p>Cards left: {props.cardsDeckLeftPlayer}</p>
  </div>
)

export default ExtraInfo
